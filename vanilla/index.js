const itemsOne = [{ code: "0001", price: 24.95 }, { code: "0001", price: 24.95 }, { code: "0002", price: 65.00 }, { code: "0003", price: 3.99 }];
const itemsTwo = [{ code: "0001", price: 24.95 }, { code: "0001", price: 24.95 }, { code: "0001", price: 24.95 }];
const itemsThree = [{ code: "0002", price: 65.00 }, { code: "0002", price: 65.00 }, { code: "0003", price: 3.99 }]

const checkout = promotionalRules => {
  const promos = promotionalRules;
  let checkoutItems;

  return {
    scan: items => {
      checkoutItems = items;
    },
    total: () => {
      const revisedItems = promos.itemReductions.reduce((checkoutItems, promoFunction) => promoFunction(checkoutItems), checkoutItems);
      const total = revisedItems.reduce((total, current) => {
        return (Math.round(total * 100) / 100) + current.price
      }, 0);
      const revisedTotal = promos.totalReductions.reduce((newTotal, promoFunction) => promoFunction(newTotal), total);
      console.log('Danesh revisedTotal', revisedTotal);
      return revisedTotal;
    }
  }
};

function overSeventyFive(total) {
  if (total > 75) {
    const newTotal = total * 0.9
    return (Math.round(newTotal * 100) / 100);
  }
  return total;
}

function twoOrMoreWaterBottles(items) {
  const newItems = items;
  const waterBottles = newItems.filter(x => x.code === "0001");
  if (waterBottles.length > 1) {
    newItems.forEach(x => {
      if (x.code === "0001") {
        x.price = 22.99;
      }
    })
  }
  return newItems;
}

const promotionalRules = { itemReductions: [twoOrMoreWaterBottles], totalReductions: [overSeventyFive] };

const checkoutOne = checkout(promotionalRules);
checkoutOne.scan(itemsOne);
checkoutOne.total();

const checkoutTwo = checkout(promotionalRules);
checkoutTwo.scan(itemsTwo);
checkoutTwo.total()

const checkoutThree = checkout(promotionalRules);
checkoutThree.scan(itemsThree);
checkoutThree.total()