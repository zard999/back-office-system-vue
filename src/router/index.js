import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404";
// 引入进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 第一种方法，太麻烦了
// import RenderRouterView from "../components/RenderRouterView.vue";

Vue.use(VueRouter);

const routes = [
  // user
  {
    path: "/user",
    // 第二种方式：jsx语法
    // component: { render: (h) => h("router-view") },
    // 第三种方式
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/layouts/UserLayout.vue"
      ),
    children: [
      // 重定向到login页面
      {
        path: "/user",
        redirect: "/user/login",
      },

      // login页面
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Login.vue"),
      },

      // register页面
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Register.vue"),
      },
    ],
  },

  // index 主页
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../components/layouts/BasicLayout"
      ),

    // dashboard (仪表盘)页面
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: (h) => h("router-view") },
        children: [
          // 分析页
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },

      // form
      {
        path: "/form",
        name: "form",
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basic-form",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Forms/BasicForm"
              ),
          },
          {
            path: "/form/step-form",
            name: "step-form",
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/from/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/Step1"
                  ),
              },
              {
                path: "/from/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/Step2"
                  ),
              },
              {
                path: "/from/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/Step3"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },

  // 404
  {
    path: "*",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to.path, from.path);
  // 当路由路径改变时，才使用进度条
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
