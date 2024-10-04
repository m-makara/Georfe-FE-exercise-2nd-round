const increaseQualityByOne = (item: Item) => {
  if (item.quality < 50) {
    item.quality += 1;
  }
};
const decreaseQualityByOne = (item: Item) => {
  if (item.quality > 0) {
    item.quality -= 1;
  }
};
const decreaseSellInByOne = (item: Item) => {
  item.sellIn -= 1;
};

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const updateLegendary = (item: Item): Item => {
  return item;
};
const updateNormalItem = (item: Item): Item => {
  if (item.quality > 0) {
    item.quality -= 1;
  }
  decreaseSellInByOne(item);
  if (item.sellIn < 0) {
    decreaseQualityByOne(item);
  }
  return item;
};

const updateAgedBrie = (item: Item): Item => {
  increaseQualityByOne(item);
  if (item.sellIn < 0) {
    increaseQualityByOne(item);
  }

  return item;
};

const updateBackStage = (item: Item) => {
  increaseQualityByOne(item);
  if (item.sellIn < 11) {
    increaseQualityByOne(item);
  }
  if (item.sellIn < 6) {
    increaseQualityByOne(item);
  }
  if (item.sellIn <= 0) {
    item.quality = item.quality - item.quality;
  }
  return item;
};

const updateConjuredItem = (item: Item) => {
  if (item.quality > 0) {
    decreaseQualityByOne(item);
    decreaseQualityByOne(item);
  }
  decreaseSellInByOne(item);
  if (item.sellIn < 0) {
    decreaseQualityByOne(item);
    decreaseQualityByOne(item);
  }
  return item;
};

const isAgedBrie = (item: Item) => item.name === "Aged Brie";
const isBackstagePass = (item: Item) =>
  item.name === "Backstage passes to a TAFKAL80ETC concert";
const isSulfuras = (item: Item) => item.name === "Sulfuras, Hand of Ragnaros";
const isConjured = (item: Item) => item.name === "Conjured";

export class Shop {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      switch (true) {
        case isSulfuras(item):
          updateLegendary(item);
          break;
        case isAgedBrie(item):
          updateAgedBrie(item);
          break;
        case isBackstagePass(item):
          updateBackStage(item);
          break;
        case isConjured(item):
          updateConjuredItem(item);
          break;
        default:
          updateNormalItem(item);
          break;
      }

      return this.items;
    }
  }
}
