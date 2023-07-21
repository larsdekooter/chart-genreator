export default class Utils {
  static _seed = Date.now();
  static MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  constructor() {}
  static srand(seed: number) {
    Utils._seed = seed;
  }
  static rand({ min = 0, max = 0 }) {
    Utils._seed = (Utils._seed * 9301 + 49297) % 233280;
    return min + (Utils._seed / 233280) * (max - min);
  }
  static numbers({
    min = 0,
    max = 100,
    from = [] as number[],
    count = 8,
    decimals = 8,
    continuity = 1,
  }) {
    const dFactor = Math.pow(10, decimals);
    const data = [];
    let i, value;

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand({ min, max });
      if (this.rand({}) <= continuity) {
        data.push(Math.round(dFactor * value) / dFactor);
      } else {
        data.push(null);
      }
    }

    return data;
  }
  static points({
    min = 0,
    max = 100,
    from = [] as number[],
    count = 8,
    decimals = 8,
    continuity = 1,
  }) {
    const xs = this.numbers({ min, max, from, count, decimals, continuity });
    const ys = this.numbers({ min, max, from, count, decimals, continuity });
    return xs.map((x, i) => ({ x, y: ys[i], r: undefined })) as {
      x: number;
      y: number;
      r?: number;
    }[];
  }
  static bubbles({
    min = 0,
    max = 100,
    from = [] as number[],
    count = 8,
    decimals = 8,
    continuity = 1,
    rmin = 5,
    rmax = 15,
  }) {
    return this.points({ min, max, from, count, decimals, continuity }).map(
      (pt) => {
        pt.r = this.rand({ min: rmin, max: rmax });
        return pt;
      }
    );
  }
  static labels({ min = 0, max = 100, count = 8, decimals = 8, prefix = "" }) {
    const values = [];
    let i;
    const step = (max - min) / count;
    const dFactor = Math.pow(10, decimals);

    for (i = min; i < max; i + step) {
      values.push(prefix + Math.round(dFactor * i) / dFactor);
    }
    return values;
  }
  static months({ count = 12, section }: { count: number; section: number }) {
    const values = [];
    let i, value;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 2];
      values.push(value.substring(0, section));
    }
    return values;
  }
  static CHART_COLORS = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };
  static NAMED_COLORS = [
    Utils.CHART_COLORS.red,
    Utils.CHART_COLORS.orange,
    Utils.CHART_COLORS.yellow,
    Utils.CHART_COLORS.green,
    Utils.CHART_COLORS.blue,
    Utils.CHART_COLORS.purple,
    Utils.CHART_COLORS.grey,
  ];
  static namedColor(index: number) {
    return Utils.NAMED_COLORS[index % Utils.NAMED_COLORS.length];
  }
  static shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  static COLORS = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
  ];
  static color(index: number) {
    return Utils.COLORS[index % Utils.COLORS.length];
  }
}
