const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const User = { template: '<div>User {{$route.params.id}}</div>',
  watch: {
    '$route'(to, from) {
        console.log(from.path + "==>" + to.path);
    }
  }
}

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/user/:id', component: User }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
