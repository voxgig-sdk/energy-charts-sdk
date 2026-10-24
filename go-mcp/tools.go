package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/energy-charts-sdk/go"
)

// ListArgs is what an agent sends to energy-charts_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: frequency | installed_model | public_power_forecast | ren_share_daily_avg | ren_share_model | solar_share_daily_avg | traffic_model | wind_offshore_share_daily_avg | wind_onshore_share_daily_avg"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to energy-charts_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: cbet | cbpf | price | public_power | solar_share | total_power | wind_offshore_share | wind_onshore_share"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.EnergyChartsSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "energy-charts_list",
		Description: "List records from EnergyCharts. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("frequency", "installed_model", "public_power_forecast", "ren_share_daily_avg", "ren_share_model", "solar_share_daily_avg", "traffic_model", "wind_offshore_share_daily_avg", "wind_onshore_share_daily_avg"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "energy-charts_load",
		Description: "Load one record from EnergyCharts. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("cbet", "cbpf", "price", "public_power", "solar_share", "total_power", "wind_offshore_share", "wind_onshore_share"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.EnergyChartsSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.EnergyChartsSDK, name string) (sdk.EnergyChartsEntity, error) {
	switch strings.ToLower(name) {
	case "cbet":
		return client.Cbet(nil), nil
	case "cbpf":
		return client.Cbpf(nil), nil
	case "frequency":
		return client.Frequency(nil), nil
	case "installed_model":
		return client.InstalledModel(nil), nil
	case "price":
		return client.Price(nil), nil
	case "public_power":
		return client.PublicPower(nil), nil
	case "public_power_forecast":
		return client.PublicPowerForecast(nil), nil
	case "ren_share_daily_avg":
		return client.RenShareDailyAvg(nil), nil
	case "ren_share_model":
		return client.RenShareModel(nil), nil
	case "solar_share":
		return client.SolarShare(nil), nil
	case "solar_share_daily_avg":
		return client.SolarShareDailyAvg(nil), nil
	case "total_power":
		return client.TotalPower(nil), nil
	case "traffic_model":
		return client.TrafficModel(nil), nil
	case "wind_offshore_share":
		return client.WindOffshoreShare(nil), nil
	case "wind_offshore_share_daily_avg":
		return client.WindOffshoreShareDailyAvg(nil), nil
	case "wind_onshore_share":
		return client.WindOnshoreShare(nil), nil
	case "wind_onshore_share_daily_avg":
		return client.WindOnshoreShareDailyAvg(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
