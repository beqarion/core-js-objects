/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj));
  Object.assign(copy, obj);
  return copy;
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  return objects.reduce((acc, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (Object.hasOwn(acc, key)) {
        acc[key] += value; // Sum values if the key exists
      } else {
        acc[key] = value; // Add the key-value pair if the key does not exist
      }
    });
    return acc;
  }, {});
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const result = { ...obj };

  keys.forEach((key) => {
    if (Object.hasOwn(result, key)) {
      delete result[key];
    }
  });

  return result;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const { length } = Object.keys(obj1);

  const obj1Entries = Object.entries(obj1);
  const obj2Entries = Object.entries(obj2);

  let equality = true;
  let i = 0;
  while (i < length) {
    const entry1 = obj1Entries[i];
    const entry2 = obj2Entries[i];

    if (entry1[0] !== entry2[0] || entry1[1] !== entry2[1]) {
      equality = false;
      break;
    }

    i += 1;
  }
  return equality;
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const { length } = Object.values(lettersObject).flat();
  return Object.entries(lettersObject)
    .reduce((acc, [key, value]) => {
      value.forEach((i) => {
        acc[i] = key;
      });
      return acc;
    }, new Array(length))
    .join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  let count25 = 0;
  let count50 = 0;

  for (let i = 0; i < queue.length; i += 1) {
    const bill = queue[i];

    if (bill === 25) {
      count25 += 1;
    } else if (bill === 50) {
      if (count25 >= 1) {
        count25 -= 1;
        count50 += 1;
      } else {
        return false;
      }
    } else if (bill === 100) {
      if (count50 >= 1 && count25 >= 1) {
        count50 -= 1;
        count25 -= 1;
      } else if (count25 >= 3) {
        count25 -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return width * height;
    },
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const parsed = JSON.parse(json);
  const circle = Object.create(proto);
  Object.assign(circle, parsed);
  return circle;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort((a, b) => {
    const countryOneCode = a.country.toLowerCase().charCodeAt(0);
    const countryTwoCode = b.country.toLowerCase().charCodeAt(0);
    const cityOneCode = a.city.toLowerCase().charCodeAt(0);
    const cityTwoCode = b.city.toLowerCase().charCodeAt(0);

    if (countryOneCode !== countryTwoCode) {
      return countryOneCode - countryTwoCode;
    }
    if (cityOneCode !== cityTwoCode) {
      return cityOneCode - cityTwoCode;
    }
    return 0;
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const map = new Map();

  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    const key = keySelector(item);
    const value = valueSelector(item);

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(value);
  }

  return map;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */
class Selector {
  constructor() {
    this.elementName = '';
    this.idName = '';
    this.classes = [];
    this.attributes = [];
    this.pseudoClasses = [];
    this.pseudoElementName = '';
    this.combinator = '';
    this.combinedSelectors = [];
  }

  element(value) {
    if (this.elementName)
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    this.elementName = value;
    return this;
  }

  id(value) {
    if (!this.elementName) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.idName)
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    this.idName = `#${value}`;
    return this;
  }

  class(value) {
    if (!this.elementName || !this.idName) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.classes.push(`.${value}`);
    return this;
  }

  attr(value) {
    if (!this.elementName || !this.idName || !this.classes.length) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.attributes.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    if (
      !this.elementName ||
      !this.idName ||
      !this.classes.length ||
      !this.attributes.length
    ) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.pseudoClasses.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    if (
      !this.elementName ||
      !this.idName ||
      !this.classes.length ||
      !this.attributes.length ||
      !this.pseudoClasses.length
    ) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.pseudoElementName)
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    this.pseudoElementName = `::${value}`;
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.combinedSelectors.push(selector1, combinator, selector2);
    return this;
  }

  // stringify
  stringify() {
    if (this.combinedSelectors.length) {
      return this.combinedSelectors
        .map((sel) => (typeof sel === 'string' ? ` ${sel} ` : sel.stringify()))
        .join('');
    }
    return (
      this.elementName +
      this.idName +
      this.classes.join('') +
      this.attributes.join('') +
      this.pseudoClasses.join('') +
      this.pseudoElementName
    );
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new Selector().element(value);
  },

  id(value) {
    return new Selector().id(value);
  },

  class(value) {
    return new Selector().class(value);
  },

  attr(value) {
    return new Selector().attr(value);
  },

  pseudoClass(value) {
    return new Selector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new Selector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new Selector().combine(selector1, combinator, selector2);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
