import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", () => {
  const SELL_IN_ZERO = 0;
  const SELL_IN_15 = 15;
  const SELL_IN_10 = 10;
  const SELL_IN_5 = 5;
  const QUALITY_MIN = 0;
  const QUALITY_MAX = 50;
  const QUALITY_10 = 10;

  const DEFAULT_ITEM_NAME = "foo";
  const AGED_BRIE_NAME = "Aged Brie";
  const SULFURAS_NAME = "Sulfuras, Hand of Ragnaros";
  const BACKSTAGE_NAME = "Backstage passes to a TAFKAL80ETC concert";
  const CONJURED_NAME = "Conjured";

  it("name doesn't change", () => {
    const gildedRose = new Shop([
      new Item(DEFAULT_ITEM_NAME, SELL_IN_ZERO, QUALITY_MIN),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual(DEFAULT_ITEM_NAME);
  });
  it("quality lowers everyday", () => {
    const gildedRose = new Shop([
      new Item(DEFAULT_ITEM_NAME, SELL_IN_10, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });
  it("sellIn lowers everyday", () => {
    const gildedRose = new Shop([
      new Item(DEFAULT_ITEM_NAME, SELL_IN_10, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9);
  });
  it("once sellIn date has passed, quality should degrade twice as fast", () => {
    const gildedRose = new Shop([
      new Item(DEFAULT_ITEM_NAME, SELL_IN_ZERO, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });
  it("quality should never be negative", () => {
    const gildedRose = new Shop([
      new Item(DEFAULT_ITEM_NAME, SELL_IN_ZERO, QUALITY_MIN),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY_MIN);
  });
  it("Aged Brie increases in quality, the older it is", () => {
    const gildedRose = new Shop([
      new Item(AGED_BRIE_NAME, SELL_IN_10, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });
  it("quality is never more than 50", () => {
    const gildedRose = new Shop([
      new Item(AGED_BRIE_NAME, SELL_IN_10, QUALITY_MAX),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY_MAX);
  });
  it("Sulfuras, Hand of Ragnaros never decreases in quality", () => {
    const gildedRose = new Shop([
      new Item(SULFURAS_NAME, SELL_IN_10, QUALITY_MAX),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY_MAX);
  });
  it("Sulfuras, Hand of Ragnaros never has to be sold", () => {
    const gildedRose = new Shop([
      new Item(SULFURAS_NAME, SELL_IN_10, QUALITY_MAX),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(SELL_IN_10);
  });
  it("Backstage pass increase in quality as sellIn approaches", () => {
    const gildedRose = new Shop([
      new Item(BACKSTAGE_NAME, SELL_IN_15, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });
  it("Backstage pass increase in quality by 2 when sellIn is 10 or less days", () => {
    const gildedRose = new Shop([
      new Item(BACKSTAGE_NAME, SELL_IN_10, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });
  it("Backstage pass increase in quality by 3 when sellIn is 5 or less days", () => {
    const gildedRose = new Shop([
      new Item(BACKSTAGE_NAME, SELL_IN_5, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });
  it("Backstage pass quality drops to 0 after sellIn", () => {
    const gildedRose = new Shop([
      new Item(BACKSTAGE_NAME, SELL_IN_ZERO, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(QUALITY_MIN);
  });
  it("Conjured Item degrades twice as fast", () => {
    const gildedRose = new Shop([
      new Item(CONJURED_NAME, SELL_IN_10, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });
  it("Conjured Item degrades twice as fast for items after the sellIn date", () => {
    const gildedRose = new Shop([
      new Item(CONJURED_NAME, SELL_IN_ZERO, QUALITY_10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });
});
