import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'




Vue.use(Router)

let path = '/';
export default new Router({
  routes: [
    {  /*========================登录============================================*/
      path: '/load',
      name: 'load',
      meta: {breadName: '登录',keepAlive: false},
      component: resolve => require(['@standardRevision/load/load.vue'], resolve),
    },
    {
      path: '/password',
      name: 'password',
      meta: {breadName: '忘记密码',keepAlive: false},
      component: resolve => require(['@standardRevision/load/password.vue'], resolve),
    },
    {
      path: '/registrant',
      name: 'registrant',
      meta: {breadName: '注册页面',keepAlive: false},
      component: resolve => require(['@standardRevision/load/registrant.vue'], resolve),
    },
    {  /*========================标准制修订============================================*/
      path: '/',
      name: 'standardRevisionManage',
      meta: {breadName: '标准制修订'},
      redirect: '/index',
      component: resolve => require(['@standardRevision/index'], resolve),
      children:[
        {
          path: '/overview',
          name:'overview',
          meta: {breadName: '概览'},
          component: resolve =>require(['@/view/home.vue'], resolve),
        },
        {
          path: '/standarAppliList',
          redirect: '/standarAppliList',
          meta: {breadName: '标准立项阶段'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/standarAppliList',
              name: 'standarAppliList',
              meta: {breadName: '立项申请'},
              component: resolve => require(['@standardRevision/standardProject/standarAppliList.vue'], resolve),
            },
            {
              path: '/standarAppliDetail',
              name: 'standarAppliDetail',
              meta: {breadName: '立项申请详情页'},
              component: resolve => require(['@standardRevision/standardProject/standarAppliDetail.vue'], resolve),
            },
            {
              path: '/standarFirstTrialList',
              name: 'standarFirstTrialList',
              meta: {breadName: 'SC初审'},
              component: resolve => require(['@standardRevision/standardProject/standarFirstTrialList.vue'], resolve),
            },
            {
              path: '/standarFirstTrialDetail',
              name: 'standarFirstTrialDetail',
              meta: {breadName: 'SC初审详情页'},
              component: resolve => require(['@standardRevision/standardProject/standarFirstTrialDetail.vue'], resolve),
            },
            {
              path: '/standarReviewList',
              name: 'standarReviewList',
              meta: {breadName: 'TC复审'},
              component: resolve => require(['@standardRevision/standardProject/standarReviewList.vue'], resolve),
            },
            {
              path: '/standarReviewDetail',
              name: 'standarReviewDetail',
              meta: {breadName: 'TC复审详情页'},
              component: resolve => require(['@standardRevision/standardProject/standarReviewDetail.vue'], resolve),
            },
            {
              path: '/NationalBureauReviewList',
              name: 'NationalBureauReviewList',
              meta: {breadName: '国家局审核'},
              component: resolve => require(['@standardRevision/standardProject/NationalBureauReviewList.vue'], resolve),
            },
            {
              path: '/NationalBureauReviewDetail',
              name: 'NationalBureauReviewDetail',
              meta: {breadName: '国家局审核详情页'},
              component: resolve => require(['@standardRevision/standardProject/NationalBureauReviewDetail.vue'], resolve),
            },
          ]
        },
        {
          path: '/standarDraftingList',
          redirect: '/standarDraftingList',
          meta: {breadName: '标准起草'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/standarDraftingList',
              name: 'standarDraftingList',
              meta: {breadName: '标准起草'},
              component: resolve => require(['@standardRevision/standardDrafting/standarDraftingList.vue'], resolve),
            },
            {
              path: '/standarDraftingDetail',
              name: 'standarDraftingDetail',
              meta: {breadName: '标准起草详情页'},
              component: resolve => require(['@standardRevision/standardDrafting/standarDraftingDetail.vue'], resolve),
            },
          ]
        },
        {
          path: '/standardSolicitOpinionsList',
          redirect: '/standardSolicitOpinionsList',
          meta: {breadName: '征集意见'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/standardSolicitOpinionsList',
              name: 'standardSolicitOpinionsList',
              meta: {breadName: '征集意见'},
              component: resolve => require(['@standardRevision/standardSolicitOpinions/standardSolicitOpinionsList.vue'], resolve),
            },
            {
              path: '/standardSolicitOpinionsDetail',
              name: 'standardSolicitOpinionsDetail',
              meta: {breadName: '征集意见详情页'},
              component: resolve => require(['@standardRevision/standardSolicitOpinions/standardSolicitOpinionsDetail.vue'], resolve),
            },
          ]
        },
        {
          path: '/SCReviewList',
          redirect: '/SCReviewList',
          meta: {breadName: '标准审查'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/SCReviewList',
              name: 'SCReviewList',
              meta: {breadName: 'SC审核'},
              component: resolve => require(['@standardRevision/standardReview/SCReviewList.vue'], resolve),
            },
            {
              path: '/SCReviewDetail',
              name: 'SCReviewDetail',
              meta: {breadName: 'SC审核详情页'},
              component: resolve => require(['@standardRevision/standardReview/SCReviewDetail.vue'], resolve),
            },
            {
              path: '/TCReviewList',
              name: 'TCReviewList',
              meta: {breadName: 'TC审核'},
              component: resolve => require(['@standardRevision/standardReview/TCReviewList.vue'], resolve),
            },
            {
              path: '/TCReviewDetail',
              name: 'TCReviewDetail',
              meta: {breadName: 'TC审核详情页'},
              component: resolve => require(['@standardRevision/standardReview/TCReviewDetail.vue'], resolve),
            },
          ]
        },
        {
          path: '/NBApprovalList',
          redirect: '/NBApprovalList',
          meta: {breadName: '标准报批'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/TCApprovalList',
              name: 'TCApprovalList',
              meta: {breadName: 'TC审查'},
              component: resolve => require(['@standardRevision/standardApproval/TCReviewList.vue'], resolve),
            },
            {
              path: '/TCApprovalDetail',
              name: 'TCApprovalDetail',
              meta: {breadName: 'TC审查详情页'},
              component: resolve => require(['@standardRevision/standardApproval/TCReviewDetail.vue'], resolve),
            },
            {
              path: '/NBApprovalList',
              name: 'NBApprovalList',
              meta: {breadName: '国家局审查'},
              component: resolve => require(['@standardRevision/standardApproval/NBReviewList.vue'], resolve),
            },
            {
              path: '/NBApprovalDetail',
              name: 'NBApprovalDetail',
              meta: {breadName: '国家局审查详情页'},
              component: resolve => require(['@standardRevision/standardApproval/NBReviewDetail.vue'], resolve),
            }
          ]
        },
        {
          path: '/standardReleaseList',
          redirect: '/standardReleaseList',
          meta: {breadName: '标准发布'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/standardReleaseList',
              name: 'standardReleaseList',
              meta: {breadName: '标准发布'},
              component: resolve => require(['@standardRevision/standardRelease/standardReleaseList.vue'], resolve),
            },
            {
              path: '/standardReleaseDetail',
              name: 'standardReleaseDetail',
              meta: {breadName: '标准发布详情页'},
              component: resolve => require(['@standardRevision/standardRelease/standardReleaseDetail.vue'], resolve),
            },
          ]
        },
        {
          path: '/standardFileList',
          redirect: '/standardFileList',
          meta: {breadName: '标准档案'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/standardFileList',
              name: 'standardFileList',
              meta: {breadName: '标准档案'},
              component: resolve => require(['@standardRevision/standardFile/standardFileList.vue'], resolve),
            },
            {
              path: '/standardFileDetail',
              name: 'standardFileDetail',
              meta: {breadName: '标准档案详情页'},
              component: resolve => require(['@standardRevision/standardFile/standardFileDetail.vue'], resolve),
            },
          ]
        },
        {
          path: '/fileSharingList',
          redirect: '/fileSharingList',
          meta: {breadName: '文件共享'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/fileSharingList',
              name: 'fileSharingList',
              meta: {breadName: '公共文件'},
              component: resolve => require(['@standardRevision/fileSharing/fileSharingList.vue'], resolve),
            }
          ]
        },
        {
          path: '/statisticsSearch',
          redirect: '/statisticsSearch',
          meta: {breadName: '统计查询'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/statisticsSearch',
              name: 'statisticsSearch',
              meta: {breadName: '统计查询'},
              component: resolve => require(['@standardRevision/statisticsQuery/statisticsSearch.vue'], resolve),
            },
            {
              path: '/statisticsSearchDetail',
              name: 'statisticsSearchDetail',
              meta: {breadName: '统计查询详情页'},
              component: resolve => require(['@standardRevision/statisticsQuery/statisticsSearchDetail.vue'], resolve),
            }
          ]
        },
        {
          path: '/initiateVote',
          redirect: '/initiateVote',
          meta: {breadName: '投票管理'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/initiateVote',
              name: 'initiateVote',
              meta: {breadName: '发起投票'},
              component: resolve => require(['@standardRevision/votingManage/initiateVote.vue'], resolve),
            },
            {
              path: '/initiateNewVote',
              name: 'initiateNewVote',
              meta: {breadName: '投票详情页'},
              component: resolve => require(['@standardRevision/votingManage/initiateNewVote.vue'], resolve),
            },
            {
              path: '/myVote',
              name: 'myVote',
              meta: {breadName: '我的投票'},
              component: resolve => require(['@standardRevision/votingManage/myVote.vue'], resolve),
            },
            {
              path: '/myVoteDetail',
              name: 'myVoteDetail',
              meta: {breadName: '投票'},
              component: resolve => require(['@standardRevision/votingManage/myVoteDetail.vue'], resolve),
            },
            {
              path: '/myVoteDetailView',
              name: 'myVoteDetailView',
              meta: {breadName: '查看投票'},
              component: resolve => require(['@standardRevision/votingManage/myVoteDetailView.vue'], resolve),
            },
            {
              path: '/performanceAssessment',
              name: 'performanceAssessment',
              meta: {breadName: '委员履职考核'},
              component: resolve => require(['@standardRevision/votingManage/performanceAssessment.vue'], resolve),
            },
          ]
        },
        {
          path: '/registrantList',
          redirect: '/registrantList',
          meta: {breadName: '注册人员管理'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/registrantList',
              name: 'registrantList',
              meta: {breadName: '人员管理'},
              component: resolve => require(['@standardRevision/registrantManage/registrantList.vue'], resolve),
            },
            {
              path: '/registrantUpdate',
              name: 'registrantUpdate',
              meta: {breadName: '人员管理修改'},
              component: resolve => require(['@standardRevision/registrantManage/registrantUpdate.vue'], resolve),
            }
          ]
        },
        {
          path: '/Committee',
          redirect: '/Committee',
          meta: {breadName: '专家管理'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children:[
            {
              path: '/TCExpertList',
              name: 'TCExpertList',
              meta: {breadName: 'TC专家管理'},
              component: resolve => require(['@standardRevision/Committee/TCExpertList.vue'], resolve),
            },
            {
              path: '/SCExpertList',
              name: 'SCExpertList',
              meta: {breadName: 'SC专家管理'},
              component: resolve => require(['@standardRevision/Committee/SCExpertList.vue'], resolve),
            },
            {
              path: '/expertAdd',
              name: 'expertAdd',
              meta: {breadName: '专家管理新增'},
              component: resolve => require(['@standardRevision/Committee/expertAdd.vue'], resolve),
            },
            {
              path: '/expertAdd',
              name: 'expertAdd1',
              meta: {breadName: '专家管理编辑'},
              component: resolve => require(['@standardRevision/Committee/expertAdd.vue'], resolve),
            },
            {
              path: '/expertAdd',
              name: 'expertAdd2',
              meta: {breadName: '专家管理详情'},
              component: resolve => require(['@standardRevision/Committee/expertAdd.vue'], resolve),
            },
          ]
        },
      ]
    }
  ]

})
