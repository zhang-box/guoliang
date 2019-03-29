import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [

    {   //督查督办
      path: '/',
      name: 'super',
      meta: {breadName: '督查督办'},
      component: resolve => require(['@supervision/index'], resolve),
      redirect: '/overview',
      children: [
        {
          path: '/overview',
          name:'overview',
          meta: {breadName: '概览'},
          component: resolve =>require(['@/view/home.vue'], resolve),
        },
        {   //办公室
          path: '/waitingProcessed',
          redirect: '/waitingProcessed',
          meta: {breadName: '办公室'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '/waitingProcessed',
              redirect: '/waitingProcessed',
              meta: {breadName: '待办已办管理'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/waitingProcessed',
                  name: 'waitingProcessed',
                  meta: {breadName: '待办已办管理列表页'},
                  component: resolve => require(['@supervision/waitingProcessed/waitingProcessed.vue'], resolve),
                },
                {
                  path: '/waitingProcessedDetail',
                  name: 'waitingProcessedDetail',
                  meta: {breadName: '进展报送'},
                  component: resolve => require(['@supervision/waitingProcessed/waitingProcessedDetail.vue'], resolve),
                }
                /*{
                  path: '/waitingProcessed',
                  redirect: '/waitingProcessed',
                  meta: {breadName: '待办已办管理'},
                  component: {
                    render(c) {
                      return c('router-view')
                    }
                  },
                  children:[

                  ]*/
                // },

              ]
            },
            {
              path: '/supervisoryManage',
              redirect: '/supervisoryManage',
              meta: {breadName: '督查登记管理'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/supervisoryManage',
                  name: 'supervisoryManage',
                  meta: {breadName: '督查登记管理列表页'},
                  component: resolve => require(['@supervision/supervisoryManage/supervisoryManage.vue'], resolve),
                },
                {
                  path: '/createReport',
                  name: 'createReport',
                  meta: {breadName: '报告生成'},
                  component: resolve => require(['@supervision/supervisoryManage/createReport.vue'], resolve),
                },
                {
                  path: '/supervisoryUpdate',
                  name: 'supervisoryUpdate',
                  meta: {breadName: '督查登记管理修改'},
                  component: resolve => require(['@supervision/supervisoryManage/supervisoryUpdate.vue'], resolve),
                },
                {
                  path: '/supervisoryDetail',
                  name: 'supervisoryDetail',
                  meta: {breadName: '督查登记管理详情'},
                  component: resolve => require(['@supervision/supervisoryManage/supervisoryDetail.vue'], resolve),
                },
                {
                  path: '/supervisoryAdd',
                  name: 'supervisoryAdd',
                  meta: {breadName: '督查登记管理新增'},
                  component: resolve => require(['@supervision/supervisoryManage/supervisoryAdd.vue'], resolve),
                }
              ]
            },
            {
              path: '/overseeReport',
              redirect: '/overseeReport',
              meta: {breadName: '督查报告管理'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/overseeReport',
                  name: 'overseeReport',
                  meta: {breadName: '督查报告管理列表页'},
                  component: resolve => require(['@supervision/overseeReport/overseeReport.vue'], resolve),
                },
                {
                  path: '/overseeReportDetail',
                  name: 'overseeReportDetail',
                  meta: {breadName: '督办报告详情页'},
                  component: resolve => require(['@supervision/overseeReport/overseeReportDetail.vue'], resolve),
                },
                {
                  path: '/overseeReportUpdata',
                  name: 'overseeReportUpdata',
                  meta: {breadName: '汇报生成'},
                  component: resolve => require(['@supervision/overseeReport/overseeReportUpdata.vue'], resolve),
                }
              ]
            },
            {
              path: '/overdueItems',
              redirect: '/overdueItems',
              meta: {breadName: '逾期事项管理'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/overdueItems',
                  name: 'overdueItems',
                  meta: {breadName: '逾期事项管理列表页'},
                  component: resolve => require(['@supervision/overdueItems/overdueItems.vue'], resolve),
                },
                {
                  path: '/overdueItemsDetail',
                  name: 'overdueItemsDetail',
                  meta: {breadName: '逾期事项管理详情页'},
                  component: resolve => require(['@supervision/overdueItems/overdueItemsDetail.vue'], resolve),
                },
                {
                  path: '/overdueItemsUpdate',
                  name: 'overdueItemsUpdate',
                  meta: {breadName: '逾期事项管理修改页'},
                  component: resolve => require(['@supervision/overdueItems/overdueItemsUpdate.vue'], resolve),
                },
                {
                  path: '/overdueItemsApproval',
                  name: 'overdueItemsApproval',
                  meta: {breadName: '逾期事项管理审批页'},
                  component: resolve => require(['@supervision/overdueItems/overdueItemsApproval.vue'], resolve),
                }
              ]
            },
            {
              path: '/supervisoryStatistics',
              redirect: '/supervisoryStatistics',
              meta: {breadName: '督办统计'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/supervisoryStatistics',
                  name: 'supervisoryStatistics',
                  meta: {breadName: '督办统计列表页'},
                  component: resolve => require(['@supervision/supervisoryStatistics/supervisoryStatistics.vue'], resolve),
                }
              ]
            },
            {
              path: '/leadershipAudit',
              redirect: '/leadershipAudit',
              meta: {breadName: '领导审核'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/leadershipAudit',
                  name: 'leadershipAudit',
                  meta: {breadName: '领导审核列表页'},
                  component: resolve => require(['@supervision/leadershipAudit/leadershipAudit.vue'], resolve),
                },
                {
                  path: '/leadershipDetail',
                  name: 'leadershipDetail',
                  meta: {breadName: '领导审核审批一审'},
                  component: resolve => require(['@supervision/leadershipAudit/leadershipDetail.vue'], resolve),
                },
                {
                  path: '/leadershipDetail-next',
                  name: 'leadershipDetail-next',
                  meta: {breadName: '领导审核审批二审'},
                  component: resolve => require(['@supervision/leadershipAudit/leadershipDetail-next.vue'], resolve),
                }
              ]
            },
            {
              path: '/aggregationQuery',
              redirect: '/aggregationQuery',
              meta: {breadName: '汇总查询'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/aggregationQuery',
                  name: 'aggregationQuery',
                  meta: {breadName: '汇总查询列表'},
                  component: resolve => require(['@supervision/aggregationQuery/aggregationQuery.vue'], resolve),
                },
                {
                  path: '/aggregationDetail',
                  name: 'aggregationDetail',
                  meta: {breadName: '汇总查询详情'},
                  component: resolve => require(['@supervision/aggregationQuery/aggregationDetail.vue'], resolve),
                }
              ]
            },
          ]
        },
        {   //承办单位
          path: '/aggregationQuery',
          redirect: '/aggregationQuery',
          meta: {breadName: '承办司局'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '/toDoManaged',
              redirect: '/toDoManaged',
              meta: {breadName: '待办已办管理'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/toDoManaged',
                  name: 'toDoManaged',
                  meta: {breadName: '待办已办管理列表'},
                  component: resolve => require(['@supervision/toDoManaged/toDoManaged.vue'], resolve),
                },

                {
                  path: '/toDoManagedDetail',
                  name: 'toDoManagedDetail',
                  meta: {breadName: '进展报送'},
                  component: resolve => require(['@supervision/toDoManaged/toDoManagedDetail.vue'], resolve),
                }

              ]
            },
            {
              path: '/progressSummary',
              redirect: '/progressSummary',
              meta: {breadName: '进展汇总'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/progressSummary',
                  name: 'progressSummary',
                  meta: {breadName: '进展汇总列表'},
                  component: resolve => require(['@supervision/progressSummary/progressSummary.vue'], resolve),
                },
                {
                  path: '/progressSummaryDetail',
                  name: 'progressSummaryDetail',
                  meta: {breadName: '进展报送'},
                  component: resolve => require(['@supervision/progressSummary/progressSummaryDetail.vue'], resolve),
                }
              ]
            },
            {
              path: '/overseeEvents',
              redirect: '/overseeEvents',
              meta: {breadName: '督办事件办理'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/overseeEvents',
                  name: 'overseeEvents',
                  meta: {breadName: '督办事件办理列表页'},
                  component: resolve => require(['@supervision/overseeEvents/overseeEvents.vue'], resolve),
                },
                {
                  path: '/overseeEventsDetail',
                  name: 'overseeEventsDetail',
                  meta: {breadName: '督办事件办理详情页'},
                  component: resolve => require(['@supervision/overseeEvents/overseeEventsDetail.vue'], resolve),
                },
                {
                  path: '/overseeEventsUpdata',
                  name: 'overseeEventsUpdata',
                  meta: {breadName: '督办事件办理修改页'},
                  component: resolve => require(['@supervision/overseeEvents/overseeEventsUpdata.vue'], resolve),
                },
                {
                  path: '/overseeEventsProgress',
                  name: 'overseeEventsProgress',
                  meta: {breadName: '进展报送'},
                  component: resolve => require(['@supervision/overseeEvents/overseeEventsProgress.vue'], resolve),
                }
              ]
            },
            {
              path: '/overdueMatters',
              redirect: '/overdueMatters',
              meta: {breadName: '逾期办理事项'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/overdueMatters',
                  name: 'overdueMatters',
                  meta: {breadName: '逾期办理事项列表页'},
                  component: resolve => require(['@supervision/overdueMatters/overdueMatters.vue'], resolve),
                },
                {
                  path: '/overdueMattersDetail',
                  name: 'overdueMattersDetail',
                  meta: {breadName: '逾期办理事项详情页'},
                  component: resolve => require(['@supervision/overdueMatters/overdueMattersDetail.vue'], resolve),
                },
                {
                  path: '/overdueMattersProgress',
                  name: 'overdueMattersProgress',
                  meta: {breadName: '进展报送'},
                  component: resolve => require(['@supervision/overdueMatters/overdueMattersProgress.vue'], resolve),
                }
              ]
            },
            {
              path: '/submitStatistical',
              redirect: '/submitStatistical',
              meta: {breadName: '报送统计'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/submitStatistical',
                  name: 'submitStatistical',
                  meta: {breadName: '报送统计列表页'},
                  component: resolve => require(['@supervision/submitStatistical/submitStatistical.vue'], resolve),
                }

              ]
            },
            {
              path: '/supervisorAudit',
              redirect: '/supervisorAudit',
              meta: {breadName: '领导审核'},
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '/supervisorAudit',
                  name: 'supervisorAudit',
                  meta: {breadName: '领导审核列表页'},
                  component: resolve => require(['@supervision/supervisorAudit/supervisorAudit.vue'], resolve),
                },
                {
                  path: '/supervisorAuditDetail',
                  name: 'supervisorAuditDetail',
                  meta: {breadName: '领导审核详情页'},
                  component: resolve => require(['@supervision/supervisorAudit/supervisorAuditDetail.vue'], resolve),
                },
                {
                  path: '/supervisorAuditApproval',
                  name: 'supervisorAuditApproval',
                  meta: {breadName: '审批'},
                  component: resolve => require(['@supervision/supervisorAudit/supervisorAuditApproval.vue'], resolve),
                },
              ]
            },
          ]
        },


      ]
    }
  ]
})
