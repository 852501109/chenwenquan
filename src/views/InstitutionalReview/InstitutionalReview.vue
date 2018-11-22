<template>
    <div>
        <el-row class="tac">
            <el-col :span="5">
                <nav-bar></nav-bar>
            </el-col>
            <el-col :span="19">
                <el-row>
                    <el-col :span="24">
                        <el-form :inline="true" :model="selectMsg" class="demo-form-inline">
                            <el-form-item label="法人" size="mini">
                                <el-input v-model="selectMsg.legalPerson" placeholder="法人"></el-input>
                            </el-form-item>
                            <el-form-item label="认证机构" size="mini">
                                <el-input v-model="selectMsg.certificationBody" placeholder="认证机构"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="手机号" size="mini">
                                <el-input v-model="selectMsg.phone" placeholder="手机号"></el-input>
                            </el-form-item> -->
                            <el-form-item label="机构地址" size="mini">
                                <el-input v-model="selectMsg.address" placeholder="机构地址"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSearch" size="mini">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="tableData" border>
                            <el-table-column fixed prop="institutionId" label="用户ID" width="150">
                            </el-table-column>
                            <el-table-column fixed prop="createTime" label="认定时间" width="150">
                            </el-table-column>
                            <el-table-column prop="state" label="状态" width="220">
                                <template slot-scope="scope">
                                    {{stateData(scope.row.state)}}
                                </template>
                            </el-table-column>
                            <el-table-column fixed prop="createByName" label="某机构" width="150">
                            </el-table-column>
                            <el-table-column prop="createBy" label="法人" width="120">
                            </el-table-column>
                            <el-table-column prop="businessLicense" label="机构执照" width="300">
                                <template slot-scope="scope">
                                    <div style="color:blue;cursor:pointer;">机构执照.jpg</div>
                                </template>
                            </el-table-column>

                            <el-table-column fixed="right" label="审核" width="400">
                                <template slot-scope="scope">
                                    <div>
                                        <!-- <label  v-for="(item,index) in radiusState"  :key="index"  :for="scope.row.institutionId">
                                                <input @click="handleClick(scope.row,1,$index)" :data-index="index" :id="scope.row.institutionId" :name="scope.row.institutionId" type="radio"/>{{item.state}}
                                            </label> -->

                                        <el-button @click="handleClick(scope.row,'',1)" type="text" v-if="scope.row.state != 1" size="small">通过</el-button>
                                        <el-button type="text" @click="handleClick(scope.row,'',3)" v-if="scope.row.state != 3" size="small">拒绝</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-pagination small layout="pager" :total="total" @current-change="changePage" :current-page="currentPage">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { auth } from "@/api/authentication";
import {getInstitutionAuthById,getInstitutionAuthList} from "@/api/institutionalReview";
import navBar from "@/components/getRoleNav";
export default {
    name: "InstitutionalReview",
    components: {
        navBar
    },
    data() {
        return {
            page: 1,
            pages: 10,
            total: 40,
            radio: 1,
            currentPage: 1,
            radiusState: [
                { state: "认证通过" },
                { state: "运营确认" },
                { state: "认证拒绝" },
                { state: "二次提交认证" },
                { state: "认证信息修改申请" },
                { state: "认证信息修改确认" },
                { state: "认证信息修改驳回" }
            ],
            selectMsg: {
                legalPerson: "",
                certificationBody: "",
                // phone: '',
                address: ""
            },
            tableData: []
        };
    },

    mounted() {
        this.onSearch();
    },
    methods: {
        onRadioChange() {
            console.log(1);
        },
        stateData(state) {
            switch (state) {
                case 0:
                    return "无认证信息";
                    break;
                case 1:
                    return "认证通过";
                    break;
                case 2:
                    return "运营确认";
                    break;
                case 3:
                    return "认证拒绝";
                    break;
                case 4:
                    return "二次提交认证";
                    break;
                case 5:
                    return "认证信息修改申请";
                    break;
                case 6:
                    return "认证信息修改确认";
                    break;
                case 7:
                    return "认证信息修改驳回";
                    break;
            }
        },
        institutionalReview() {
            this.$router.push({ path: "/institutionalReview" });
        },
        onSearch() {
            const data = {
                page: this.page,
                pages: this.pages,
                createByName: this.selectMsg.legalPerson
            };
            getInstitutionAuthList(data)
                .then(res => {
                    const data = res.data.returnDataList.data;
                    this.tableData = data;
                    this.total = data.count;
                })
                .catch(err => {});
        },
        changePage(currentPage) {
            const data = {
                page: currentPage,
                pages: this.pages,
                createByName: this.selectMsg.legalPerson
            };
            getInstitutionAuthList(data)
                .then(res => {
                    this.tableData = res.data.returnDataList.data;
                })
                .catch(err => {});
        },
        handleClick(row, siteId, state) {
            auth(row.institutionId, row.siteId, state).then(res => {
                    const data = res.data;
                    row.state = state;
                    if (data.returnStatus !== 1) {
                        this.$message({
                            message: res.data.returnMsg,
                            type: "warning"
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.head {
    width: 95%;
    height: 40px;
    background: #666;
    color: #fff;
    margin-bottom: 30px;
}
</style>
