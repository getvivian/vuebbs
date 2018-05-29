<template>

  <div id="note">{{msg}}</div>
</template>

<script>
export default {
  name:"TestVue",
  data(){
    return {
      msg:"hello test"
    }
  }
}
</script>


<style  scoped>
 #note{
   font-size: 122px;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

 }
</style>

