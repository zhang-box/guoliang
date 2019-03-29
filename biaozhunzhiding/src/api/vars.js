const options = [
  {
    value: "1",
    label: "通用标准",
    children: [
      {
        value: "1",
        label: "术语"
      },
      {
        value: "2",
        label: "技术规范"
      },
      {
        value: "3",
        label: "管理类"
      },
      {
        value: "4",
        label: "标准物质"
      },
      {
        value: "5",
        label: "标准样品"
      },
      {
        value: "6",
        label: "标签"
      },
      {
        value: "7",
        label: "代码"
      },
      {
        value: "8",
        label: "信息管理"
      }
    ]
  },
  {
    value: "3",
    label: "产品标准",
    children: [
      {
        value: "1",
        label: "原粮、油料"
      },
      {
        value: "2",
        label: "成品粮油"
      },
      {
        value: "3",
        label: "粮油制品"
      },
      {
        value: "4",
        label: "饲料"
      },
      {
        value: "5",
        label: "粮油机械",
        children: [
          {
            value: "1",
            label: "加工机械"
          },
          {
            value: "2",
            label: "输送机械"
          },
          {
            value: "3",
            label: "售粮机械"
          },
          {
            value: "4",
            label: "食品机械"
          }
        ]
      },
      {
        value: "7",
        label: "检测仪器"
      },
      {
        value: "8",
        label: "包装材料"
      }
    ]
  },
  {
    value: "6",
    label: "方法标准",
    children: [
      {
        value: "1",
        label: "粮油检测方法"
      },
      {
        value: "2",
        label: "饲料检测方法"
      },
      {
        value: "3",
        label: "粮油机械测试方法"
      },
      {
        value: "4",
        label: "粮油仪器测试方法"
      }
    ]
  }
];

export const getStandType = idStr => {
  if (!idStr) {
    return "";
  }
  const [t1, t2] = idStr.split("-");
  const item = options.find(item => item.value == t1);
  const name = [];
  if (item) {
    name.push(item.label);
    const v2 = item.children.find(item => item.value == t2);
    if (v2) {
      name.push(v2.label);
    }
  }
  return name.join("/");
};

export const findDictValue = (dict, id) => {
  if (!dict || !id) {
    return "";
  }
  const item = dict.find(item => item.id == id);
  if (item) {
    return item.dictValue;
  }
};
