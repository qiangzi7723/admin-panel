<template>
    <div class='e-line'>
        <p>{{title}}</p>
        <el-input placeholder="请输入内容" size="mini" :value=innerValue @change=change @input=input>
        </el-input>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue,
        Watch
    } from 'vue-property-decorator';

    @Component
    export default class Input extends Vue {
        @Prop() private title!: string;
        @Prop() private value!: string;

        private innerValue: string = this.value

        private created(){
            console.log(this.value);
        }

        public change(){
            this.$parent.save();
        }   

        public input(value: string){
            this.innerValue = value
            this.$emit('input', value);
        }

        @Watch('value')
        public watchValue(){
            this.innerValue = this.value;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .e-line {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        >p {
            flex: 1;
            margin: 0;
            text-align: start;
            padding-left: 20px;
        }

        .el-input {
            flex: 2;
        }

    }
</style>