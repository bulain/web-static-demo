var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  beforeCreate: function () {
    // `this` points to the vm instance
    console.log('beforeCreated: ' + this.message);
  },
  created: function () {
    // `this` points to the vm instance
    console.log('created: ' + this.message);
  },
  beforeMount: function () {
    // `this` points to the vm instance
    console.log('beforeMount: ' + this.message);
  },
  mounted: function () {
    // `this` points to the vm instance
    console.log('mounted: ' + this.message);
  },
  beforeUpdate: function () {
    // `this` points to the vm instance
    console.log('beforeUpdate: ' + this.message);
  },
  updated: function () {
    // `this` points to the vm instance
    console.log('updated: ' + this.message);
  },
  actived: function () {
    // `this` points to the vm instance
    console.log('actived: ' + this.message);
  },
  deactived: function () {
    // `this` points to the vm instance
    console.log('deactived: ' + this.message);
  },
  beforeDestroy: function () {
    // `this` points to the vm instance
    console.log('beforeDestory: ' + this.message);
  },
  destroyed: function () {
    // `this` points to the vm instance
    console.log('destoryed: ' + this.message);
  }
});
