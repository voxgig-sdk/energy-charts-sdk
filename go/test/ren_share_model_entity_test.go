package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/energy-charts-sdk"
	"github.com/voxgig-sdk/energy-charts-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestRenShareModelEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RenShareModel(nil)
		if ent == nil {
			t.Fatal("expected non-nil RenShareModelEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ren_share_modelBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ren_share_model." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ENERGYCHARTS_TEST_REN_SHARE_MODEL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		renShareModelRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.ren_share_model", setup.data)))
		var renShareModelRef01Data map[string]any
		if len(renShareModelRef01DataRaw) > 0 {
			renShareModelRef01Data = core.ToMapAny(renShareModelRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = renShareModelRef01Data

		// LIST
		renShareModelRef01Ent := client.RenShareModel(nil)
		renShareModelRef01Match := map[string]any{}

		renShareModelRef01ListResult, err := renShareModelRef01Ent.List(renShareModelRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, renShareModelRef01ListOk := renShareModelRef01ListResult.([]any)
		if !renShareModelRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", renShareModelRef01ListResult)
		}

	})
}

func ren_share_modelBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ren_share_model", "RenShareModelTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ren_share_model test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ren_share_model test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ren_share_model01", "ren_share_model02", "ren_share_model03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ENERGYCHARTS_TEST_REN_SHARE_MODEL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ENERGYCHARTS_TEST_REN_SHARE_MODEL_ENTID": idmap,
		"ENERGYCHARTS_TEST_LIVE":      "FALSE",
		"ENERGYCHARTS_TEST_EXPLAIN":   "FALSE",
		"ENERGYCHARTS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ENERGYCHARTS_TEST_REN_SHARE_MODEL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ENERGYCHARTS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ENERGYCHARTS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewEnergyChartsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ENERGYCHARTS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ENERGYCHARTS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
