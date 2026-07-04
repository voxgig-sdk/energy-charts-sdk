# EnergyCharts SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import EnergyChartsUtility
from core.spec import EnergyChartsSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import EnergyChartsBaseFeature
from features import _make_feature


class EnergyChartsSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = EnergyChartsUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return EnergyChartsUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = EnergyChartsSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def cross_border_model(self):
        """Idiomatic facade: client.cross_border_model.list() / client.cross_border_model.load({"id": ...})."""
        from entity.cross_border_model_entity import CrossBorderModelEntity
        cached = getattr(self, "_cross_border_model", None)
        if cached is None:
            cached = CrossBorderModelEntity(self, None)
            self._cross_border_model = cached
        return cached

    def CrossBorderModel(self, data=None):
        # Deprecated: use client.cross_border_model instead.
        from entity.cross_border_model_entity import CrossBorderModelEntity
        return CrossBorderModelEntity(self, data)


    @property
    def daily_avg_dict(self):
        """Idiomatic facade: client.daily_avg_dict.list() / client.daily_avg_dict.load({"id": ...})."""
        from entity.daily_avg_dict_entity import DailyAvgDictEntity
        cached = getattr(self, "_daily_avg_dict", None)
        if cached is None:
            cached = DailyAvgDictEntity(self, None)
            self._daily_avg_dict = cached
        return cached

    def DailyAvgDict(self, data=None):
        # Deprecated: use client.daily_avg_dict instead.
        from entity.daily_avg_dict_entity import DailyAvgDictEntity
        return DailyAvgDictEntity(self, data)


    @property
    def frequency(self):
        """Idiomatic facade: client.frequency.list() / client.frequency.load({"id": ...})."""
        from entity.frequency_entity import FrequencyEntity
        cached = getattr(self, "_frequency", None)
        if cached is None:
            cached = FrequencyEntity(self, None)
            self._frequency = cached
        return cached

    def Frequency(self, data=None):
        # Deprecated: use client.frequency instead.
        from entity.frequency_entity import FrequencyEntity
        return FrequencyEntity(self, data)


    @property
    def installed_model(self):
        """Idiomatic facade: client.installed_model.list() / client.installed_model.load({"id": ...})."""
        from entity.installed_model_entity import InstalledModelEntity
        cached = getattr(self, "_installed_model", None)
        if cached is None:
            cached = InstalledModelEntity(self, None)
            self._installed_model = cached
        return cached

    def InstalledModel(self, data=None):
        # Deprecated: use client.installed_model instead.
        from entity.installed_model_entity import InstalledModelEntity
        return InstalledModelEntity(self, data)


    @property
    def price(self):
        """Idiomatic facade: client.price.list() / client.price.load({"id": ...})."""
        from entity.price_entity import PriceEntity
        cached = getattr(self, "_price", None)
        if cached is None:
            cached = PriceEntity(self, None)
            self._price = cached
        return cached

    def Price(self, data=None):
        # Deprecated: use client.price instead.
        from entity.price_entity import PriceEntity
        return PriceEntity(self, data)


    @property
    def production_model(self):
        """Idiomatic facade: client.production_model.list() / client.production_model.load({"id": ...})."""
        from entity.production_model_entity import ProductionModelEntity
        cached = getattr(self, "_production_model", None)
        if cached is None:
            cached = ProductionModelEntity(self, None)
            self._production_model = cached
        return cached

    def ProductionModel(self, data=None):
        # Deprecated: use client.production_model instead.
        from entity.production_model_entity import ProductionModelEntity
        return ProductionModelEntity(self, data)


    @property
    def public_power_forecast(self):
        """Idiomatic facade: client.public_power_forecast.list() / client.public_power_forecast.load({"id": ...})."""
        from entity.public_power_forecast_entity import PublicPowerForecastEntity
        cached = getattr(self, "_public_power_forecast", None)
        if cached is None:
            cached = PublicPowerForecastEntity(self, None)
            self._public_power_forecast = cached
        return cached

    def PublicPowerForecast(self, data=None):
        # Deprecated: use client.public_power_forecast instead.
        from entity.public_power_forecast_entity import PublicPowerForecastEntity
        return PublicPowerForecastEntity(self, data)


    @property
    def ren_share_model(self):
        """Idiomatic facade: client.ren_share_model.list() / client.ren_share_model.load({"id": ...})."""
        from entity.ren_share_model_entity import RenShareModelEntity
        cached = getattr(self, "_ren_share_model", None)
        if cached is None:
            cached = RenShareModelEntity(self, None)
            self._ren_share_model = cached
        return cached

    def RenShareModel(self, data=None):
        # Deprecated: use client.ren_share_model instead.
        from entity.ren_share_model_entity import RenShareModelEntity
        return RenShareModelEntity(self, data)


    @property
    def share_model(self):
        """Idiomatic facade: client.share_model.list() / client.share_model.load({"id": ...})."""
        from entity.share_model_entity import ShareModelEntity
        cached = getattr(self, "_share_model", None)
        if cached is None:
            cached = ShareModelEntity(self, None)
            self._share_model = cached
        return cached

    def ShareModel(self, data=None):
        # Deprecated: use client.share_model instead.
        from entity.share_model_entity import ShareModelEntity
        return ShareModelEntity(self, data)


    @property
    def traffic_model(self):
        """Idiomatic facade: client.traffic_model.list() / client.traffic_model.load({"id": ...})."""
        from entity.traffic_model_entity import TrafficModelEntity
        cached = getattr(self, "_traffic_model", None)
        if cached is None:
            cached = TrafficModelEntity(self, None)
            self._traffic_model = cached
        return cached

    def TrafficModel(self, data=None):
        # Deprecated: use client.traffic_model instead.
        from entity.traffic_model_entity import TrafficModelEntity
        return TrafficModelEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
