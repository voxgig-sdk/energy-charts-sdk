<?php
declare(strict_types=1);

// EnergyCharts SDK base feature

class EnergyChartsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EnergyChartsContext $ctx, array $options): void {}
    public function PostConstruct(EnergyChartsContext $ctx): void {}
    public function PostConstructEntity(EnergyChartsContext $ctx): void {}
    public function SetData(EnergyChartsContext $ctx): void {}
    public function GetData(EnergyChartsContext $ctx): void {}
    public function GetMatch(EnergyChartsContext $ctx): void {}
    public function SetMatch(EnergyChartsContext $ctx): void {}
    public function PrePoint(EnergyChartsContext $ctx): void {}
    public function PreSpec(EnergyChartsContext $ctx): void {}
    public function PreRequest(EnergyChartsContext $ctx): void {}
    public function PreResponse(EnergyChartsContext $ctx): void {}
    public function PreResult(EnergyChartsContext $ctx): void {}
    public function PreDone(EnergyChartsContext $ctx): void {}
    public function PreUnexpected(EnergyChartsContext $ctx): void {}
}
