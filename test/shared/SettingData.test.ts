import SettingData, {
  FormKeymaps,
  JSONTextSettings,
  FormSettings,
} from "../../src/shared/SettingData";
import Settings from "../../src/shared/settings/Settings";
import { expect } from "chai";
import Keymaps from "../../src/shared/settings/Keymaps";

describe("shared/SettingData", () => {
  describe("FormKeymaps", () => {
    describe("#valueOF to #toKeymaps", () => {
      it("parses form keymaps and convert to operations", () => {
        const data = {
          'scroll.vertically?{"count":1}': "j",
          "scroll.home": "0",
        };

        const keymaps = FormKeymaps.fromJSON(data).toKeymaps().toJSON();
        expect(keymaps).to.deep.equal({
          j: { type: "scroll.vertically", count: 1 },
          "0": { type: "scroll.home" },
        });
      });
    });

    describe("#fromKeymaps to #toJSON", () => {
      it("create from a Keymaps and create a JSON object", () => {
        const keymaps: Keymaps = Keymaps.fromJSON({
          j: { type: "scroll.vertically", count: 1 },
          "0": { type: "scroll.home" },
        });

        const form = FormKeymaps.fromKeymaps(keymaps).toJSON();
        expect(form).to.deep.equal({
          'scroll.vertically?{"count":1}': "j",
          "scroll.home": "0",
        });
      });
    });
  });

  describe("JSONSettings", () => {
    describe("#valueOf to #toSettings", () => {
      it("parse object and create a Settings", () => {
        const o = `{
          "keymaps": {},
          "search": {
            "default": "google",
            "engines": {
              "google": "https://google.com/search?q={}"
            }
          },
          "properties": {
            "hintchars": "abcdefghijklmnopqrstuvwxyz",
            "smoothscroll": false,
            "complete": "sbh"
          },
          "blacklist": []
        }`;

        const settings = JSONTextSettings.fromText(o).toSettings();
        expect(settings.toJSON()).to.deep.equal(JSON.parse(o));
      });
    });

    describe("#fromSettings to #toJSON", () => {
      it("create from a Settings and create a JSON string", () => {
        const o = Settings.fromJSON({
          keymaps: {},
          search: {
            default: "google",
            engines: {
              google: "https://google.com/search?q={}",
            },
          },
          properties: {
            hintchars: "abcdefghijklmnopqrstuvwxyz",
            smoothscroll: false,
            complete: "sbh",
          },
          blacklist: [],
        });

        const json = JSONTextSettings.fromSettings(o).toJSONText();
        expect(JSON.parse(json)).to.deep.equal(o.toJSON());
      });
    });
  });

  describe("FormSettings", () => {
    describe("#valueOf to #toSettings", () => {
      it("parse object and create a Settings", () => {
        const data = {
          keymaps: {
            'scroll.vertically?{"count":1}': "j",
            "scroll.home": "0",
          },
          search: {
            default: "google",
            engines: [["google", "https://google.com/search?q={}"]],
          },
          properties: {
            hintchars: "abcdefghijklmnopqrstuvwxyz",
            smoothscroll: false,
            complete: "sbh",
          },
          blacklist: [],
        };

        const settings = FormSettings.fromJSON(data).toSettings();
        expect(settings.toJSON()).to.deep.equal({
          keymaps: {
            j: { type: "scroll.vertically", count: 1 },
            "0": { type: "scroll.home" },
          },
          search: {
            default: "google",
            engines: {
              google: "https://google.com/search?q={}",
            },
          },
          properties: {
            hintchars: "abcdefghijklmnopqrstuvwxyz",
            smoothscroll: false,
            complete: "sbh",
          },
          blacklist: [],
        });
      });
    });

    describe("#fromSettings to #toJSON", () => {
      it("create from a Settings and create a JSON string", () => {
        const data: Settings = Settings.fromJSON({
          keymaps: {
            j: { type: "scroll.vertically", count: 1 },
            "0": { type: "scroll.home" },
          },
          search: {
            default: "google",
            engines: {
              google: "https://google.com/search?q={}",
            },
          },
          properties: {
            hintchars: "abcdefghijklmnopqrstuvwxyz",
            smoothscroll: false,
            complete: "sbh",
          },
          blacklist: [],
        });

        const json = FormSettings.fromSettings(data).toJSON();
        expect(json).to.deep.equal({
          keymaps: {
            'scroll.vertically?{"count":1}': "j",
            "scroll.home": "0",
          },
          search: {
            default: "google",
            engines: [["google", "https://google.com/search?q={}"]],
          },
          properties: {
            hintchars: "abcdefghijklmnopqrstuvwxyz",
            smoothscroll: false,
            complete: "sbh",
          },
          blacklist: [],
        });
      });
    });
  });

  describe("SettingData", () => {
    describe("#valueOf to #toJSON", () => {
      it("parse object from json source", () => {
        const data = {
          source: "json",
          json: `{
            "keymaps": {},
            "search": {
              "default": "google",
              "engines": {
                "google": "https://google.com/search?q={}"
              }
            },
            "properties": {
              "hintchars": "abcdefghijklmnopqrstuvwxyz",
              "smoothscroll": false,
              "complete": "sbh"
            },
            "blacklist": []
          }`,
        };

        const j = SettingData.fromJSON(data).toJSON();
        expect(j.source).to.equal("json");
        expect(j.json).to.be.a("string");
      });

      it("parse object from form source", () => {
        const data = {
          source: "form",
          form: {
            keymaps: {},
            search: {
              default: "yahoo",
              engines: [["yahoo", "https://yahoo.com/search?q={}"]],
            },
            properties: {
              hintchars: "abcdefghijklmnopqrstuvwxyz",
              smoothscroll: false,
              complete: "sbh",
            },
            blacklist: [],
          },
        };

        const j = SettingData.fromJSON(data).toJSON();
        expect(j.source).to.equal("form");
        expect(j.form).to.deep.equal({
          keymaps: {},
          search: {
            default: "yahoo",
            engines: [["yahoo", "https://yahoo.com/search?q={}"]],
          },
          properties: {
            hintchars: "abcdefghijklmnopqrstuvwxyz",
            smoothscroll: false,
            complete: "sbh",
          },
          blacklist: [],
        });
      });
    });

    describe("#toSettings", () => {
      it("parse object from json source", () => {
        const data = {
          source: "json",
          json: `{
            "keymaps": {},
            "search": {
              "default": "google",
              "engines": {
                "google": "https://google.com/search?q={}"
              }
            },
            "properties": {
              "hintchars": "abcdefghijklmnopqrstuvwxyz",
              "smoothscroll": false,
              "complete": "sbh"
            },
            "blacklist": []
          }`,
        };

        const settings = SettingData.fromJSON(data).toSettings();
        expect(settings.search.defaultEngine).to.equal("google");
      });

      it("parse object from form source", () => {
        const data = {
          source: "form",
          form: {
            keymaps: {},
            search: {
              default: "yahoo",
              engines: [["yahoo", "https://yahoo.com/search?q={}"]],
            },
            properties: {
              hintchars: "abcdefghijklmnopqrstuvwxyz",
              smoothscroll: false,
              complete: "sbh",
            },
            blacklist: [],
          },
        };

        const settings = SettingData.fromJSON(data).toSettings();
        expect(settings.search.defaultEngine).to.equal("yahoo");
      });
    });
  });
});
