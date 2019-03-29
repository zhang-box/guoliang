mdata = new setData();
function setData(){
    this.getData = function(options,key) {
        var val = key.split('-');
        var result = '';
        for (var k = 0; k < options.length; k++) {
          if (parseInt(options[k].value) == parseInt(val[0])) {
            if (val.Length == 1) {
              result += options[k].label;
            }else{
              result += options[k].label+'/';
              for (var i = 0; i < options[k].children.length; i++) {
                if (options[k].children[i].value == val[1]) {
                  if (val.length == 2) {
                    result += options[k].children[i].label;
                  }else{
                    result += options[k].children[i].label+'/';
                    for (var j = 0; j < options[k].children[i].children.length; j++) {
                      if (options[k].children[i].children[j].value == val[2]) {
                        result += options[k].children[i].children[j].label;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result;
    }
    // 链动数据
    this.options = function(){
        return [
                    {
                      value: '1',
                      label: '通用标准',
                      children: [
                              {
                                value: '1',
                                label: '术语'
                              },
                              {
                                value: '2',
                                label: '技术规范'
                              },
                              {
                                value: '3',
                                label: '管理类'
                              },
                              {
                                value: '4',
                                label: '标准物资'
                              },
                              {
                                value: '5',
                                label: '标准样品'
                              },
                              {
                                value: '6',
                                label: '标签'
                              },
                              {
                                value: '7',
                                label: '代码'
                              },
                              {
                                value: '8',
                                label: '信息管理'
                              }
                          ]
                    },
                    {
                    value: '3',
                    label: '产品标准',
                    children: [{
                    value: '1',
                    label: '原粮、油料'
                    }, {
                    value: '2',
                    label: '成品粮油'
                    }, {
                    value: '3',
                    label: '粮油制品'
                    }, {
                    value: '4',
                    label: '饲料'
                    }, {
                    value: '5',
                    label: '粮油机械',
                    children: [{
                      value: '1',
                      label: '加工机械'
                    },{
                      value: '2',
                      label: '输送机械'
                    },{
                      value: '3',
                      label: '售粮机械'
                    },{
                      value: '4',
                      label: '食品机械'
                    }]
                    }, {
                    value: '7',
                    label: '检测仪器'
                    }, {
                    value: '8',
                    label: '包装材料'
                    }]
                    }, {
              value: '6',
              label: '方法标准',
              children: [
                      {
                        value: '1',
                        label: '粮油检测方法'
                      },
                      {
                        value: '2',
                        label: '饲料检测方法'
                      },
                      {
                        value: '3',
                        label: '粮油机械测试方法'
                      },
                      {
                        value: '4',
                        label: '粮油仪器测试方法'
                      }
                  ]
            }
        ];
    }
}
