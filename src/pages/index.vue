<template>
  <div class="container">
    <!-- <div>this is a index</div> -->
    <!-- <button @click="onClick">go to master</button> -->
    <div v-for="item in list" :key="item.url">
      <table>
        <tbody>
          <tr class="th">
            <th><label><input id="check" type="checkbox" :value="item.value" @change="onCheckChange($event,item);">{{item.method}}</label></th>
            <th>
              <div v-if="item.status === 'wait'">
                等待执行
              </div>
              <div v-if="item.status === 'running'">
                执行中
              </div>
              <div v-if="item.status === 'success'">
                执行成功
              </div>
              <div v-if="item.status === 'error'">
                执行失败
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button @click="clickAndRequest">执行测试</button>
    </div>
  </div>

</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      list: [],
      checkedList: []
    };
  },
  methods: {
    // onClick() {
    //   console.log("跳转页面");
    //   this.$router.push("/master");
    // },
    onCheckChange(e,item){
      item.status = 'wait'
      if(e.target.checked){
        this.checkedList.push(item)
      } else {
        let index = this.checkedList.indexOf((existItem)=>{
          return existItem.method === item.method && existItem.className === item.className
        })

        this.checkedList.splice(index,1)
      }
    },
    clickAndRequest(){
      this.runQueueTestCases(this.checkedList)
    },
    runQueueTestCases(testcases){
      // 如果执行队列为空
      if(!testcases.length) return false
      let currentCase = testcases[0]
      axios.get(`http://localhost:8082/demo/${currentCase.url}`).then(()=>{
        currentCase.status = 'success'
      },()=>{
        currentCase.status = 'error'
      }).finally(()=>{
        this.runQueueTestCases(testcases.slice(1))
      })
    }
  },
  created: function() {
    const data = {
      pageSize: 10,
      pageNo: 1,
      projectId: 1,
      openId: "o1C8c5JZL7Z-ZRIM-JQXgnTz87Uc"
    };
    axios({
      url:"http://localhost:8082/demo/tools/getAllTestCase",
      type:"GET"
    }).then(res => {
      this.list = res.data.map((item)=>{
        return {
          ...item,
          status:''
        }
      })
    })
  }
};
</script>
<style lang="less" scoped>
.container {
  font-size: 20px;
  color: red;
}
.th {

}
</style>
