<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getUserData,userLogin} from  'api/standardAppliList/zuzhijigou'

  export default {
    created(){
      window.sessionStorage.removeItem('userInfo');
      window.sessionStorage.clear();
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if(userInfo){
        this.$router.push({path:"/overview"});
      }else{
        // getUserData().then(res => {
        //   // this.$router.push({path:"/overview"});
        //
        // }).catch(res => {
        //   getUserData().then(res => {
        //     // this.$router.push({path:"/overview"});
        //
        //   }).catch(res => {
            this.$router.push({path:"/load"});
          // })
        // })
      }
    },
    name: 'App',
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }
</style>
