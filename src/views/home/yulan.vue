<template>
    <div class="bmYulan">
        <!-- <div class="filter" v-if="!showFilter" @click="changeFilter">
        <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/filter.png" alt="" />
      </div>
      <div class="filter" v-else @click="changeFilter">
        <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/filter_active.png" alt="" />
      </div> -->
        <el-dialog title="编辑视口" :visible.sync="showEditDio" class="dialog" :before-close="handleClose">
            <el-form :model="editRuleForm" :rules="editRules" ref="editRuleForm">
                <el-form-item label="视口名" prop="name" class="username formItem">
                    <el-input v-model="editRuleForm.name" placeholder="请输入视口名"></el-input>
                </el-form-item>
                <el-form-item label="优先级" prop="priority" class="username formItem">
                    <el-select placeholder="选择优先级" filterable v-model="editRuleForm.priority">
                        <el-option
                            :value="item.id"
                            v-for="item in priorityList"
                            :key="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视口图片" prop="imgFile" class="username baseImg formItem">
                    <img :src="base64String" alt="" />
                </el-form-item>
                <el-form-item label="备注信息" prop="description" class="description username formItem">
                    <el-input type="textarea" :rows="4" placeholder="请输入备注信息" v-model="editRuleForm.notes">
                    </el-input>
                </el-form-item>
                <div class="btns">
                    <el-button @click="showEditDio = false">取消</el-button>
                    <el-button type="primary" @click="submitForm('editRuleForm')">保存</el-button>
                </div>
            </el-form>

            <!-- <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="showDio = false"
          >确 定</el-button
        >
      </span> -->
        </el-dialog>
        <div class="filter menuTree" @click="changeMenu">
            <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/bim/menuTree.png" alt="" />
        </div>
        <div class="filter viewPort" @click="changeViewport">
            <img src="../../assets/images/picture_active.png" alt="" />
        </div>
        <!-- <div class="filter menuTree" v-else @click="changeMenu">
      <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/menuTree_active.png" alt="" />
    </div> -->
        <div class="listree" v-show="showMenuTree">
            <div class="header">
                <div class="top">
                    <!-- <span class="icon font_family icon-a-1"></span> -->
                    <div class="title">目录树</div>
                    <div class="close" @click="closeListTree">
                        <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/bim/close.png" alt="" />
                    </div>
                </div>
                <div class="tab">
                    <div class="tabItem" :class="activeInd === 0 ? 'active' : ''" @click="changeTab(0)">构件</div>
                    <div class="tabItem" :class="activeInd === 1 ? 'active' : ''" @click="changeTab(1)">集合</div>
                    <div class="tabItem" :class="activeInd === 2 ? 'active' : ''" @click="changeTab(2)">文件</div>
                    <!-- <div class="tabItem"></div>
          <div class="tabItem"></div> -->
                </div>
            </div>

            <div class="main">
                <div style="text-align: center; margin-top: 84px" v-if="activeInd === 0 && !treeData.length">
                    数据加载中
                </div>
                <el-tree
                    ref="gjtreeData"
                    :highlight-current="true"
                    v-show="activeInd === 0 && treeData.length"
                    :props="props"
                    :data="treeData"
                    :default-checked-keys="gjIdLists"
                    show-checkbox
                    node-key="id"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                    @check="gjCheckChange"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }" :id="data.id">
                        <span class="label clamp">{{ node.label }}</span>
                        <span>
                            <!-- <el-button
                type="text"
                v-if="!node.childNodes.length"
                size="mini"
                @click="() => append(data)"
              >
                关联
              </el-button> -->
                            <el-button
                                type="text"
                                size="mini"
                                v-if="!node.childNodes.length"
                                @click="() => remove(node, data)"
                            >
                                <span class="icon-wenjian"></span>
                                文件
                            </el-button>
                        </span>
                    </span>
                </el-tree>
                <el-tree
                    v-show="activeInd === 1"
                    :props="jhProps"
                    :data="jiheTree"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                >
                    <span class="custom-tree-node" slot-scope="{ node }">
                        <span>{{ node.label }}</span>
                        <span>
                            <!-- <el-button
                type="text"
                v-if="!node.childNodes.length"
                size="mini"
                @click="() => append(data)"
              >
                关联
              </el-button> -->
                            <!-- <el-button
                type="text"
                v-if="!node.childNodes.length"
                size="mini"
                @click="() => remove(node, data)"
              >
                <span>文件</span>
              </el-button> -->
                        </span>
                    </span>
                </el-tree>
                <el-tree
                    v-show="activeInd === 2"
                    :props="fileProps"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="[1]"
                    :default-expand-all="true"
                    :data="fileTree"
                    :expand-on-click-node="false"
                    @check-change="fileCheckChange"
                >
                    <span class="custom-tree-node" slot-scope="{ data }" @click="fileNodeClick(node)">
                        <span>{{ data.fileName }}</span>
                    </span>
                </el-tree>
            </div>
        </div>
        <!-- 这里是模型视口列表 -->
        <div class="rightFilter" v-if="viewport">
            <div class="title">
                <div class="img zjw_center">
                    <img src="../../assets/images/picture_active.png" alt="" />
                    模型视口列表
                </div>

                <div class="close" @click="() => (viewport = false)">
                    <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/delivery/bim/close.png" alt="" />
                </div>
            </div>
            <div class="search zjw_center">
                <el-input
                    prefix-icon="el-icon-search"
                    v-model="viewPortInfo.name"
                    class="input"
                    placeholder="输入查询内容"
                    clearable
                    @input="getViewList(viewPortInfo)"
                ></el-input>
                <div class="creatFilter" @click="caijian">创建视口</div>
            </div>
            <div class="viewPortFilter zjw_center">
                <el-select
                    clearable
                    placeholder="选择优先级"
                    v-model="viewPortInfo.priority"
                    @change="getViewList(viewPortInfo)"
                >
                    <el-option
                        :value="item.id"
                        v-for="item in priorityList"
                        :key="item.id"
                        :label="item.name"
                    ></el-option>
                </el-select>
                <el-select
                    placeholder="创建人"
                    clearable
                    v-model="viewPortInfo.createdBy"
                    @change="getViewList(viewPortInfo)"
                >
                    <el-option :value="item" v-for="item in memberList" :key="item" :label="item"></el-option>
                </el-select>
            </div>
            <div class="viewPortList lists">
                <div class="viewPortItem" v-for="item in viewPortList" :key="item.id">
                    <div class="cardTop zjw_center">
                        <div class="cardTopLeft zjw_center">
                            <div class="avtUrl">
                                <img src="../../assets/images/avturl.png" alt="" />
                            </div>
                            <div class="info">
                                <div class="creatName">{{ item.updatedBy }}</div>
                                <div class="creatTime">{{ item.gmtModified }}</div>
                            </div>
                        </div>
                        <div class="cardTopRight zjw_center">
                            <div class="icon" :class="areaId === item.id ? 'blue' : ''" @click="setArea(item)">
                                <i class="el-icon-location-outline"></i>
                            </div>
                            <div class="icon" :class="editId === item.id ? 'blue' : ''" @click="getEditInfo(item)">
                                <i class="el-icon-edit"></i>
                            </div>
                            <div class="icon" @click="deletViewPort(item)">
                                <i class="el-icon-delete"></i>
                            </div>
                        </div>
                    </div>
                    <div class="cardMain">
                        <div class="viewName zjw_center">
                            <div class="nameInfo clamp">{{ item.name }}</div>
                            <div class="status normal" v-if="item.priority === 0">一般</div>
                            <div class="status import" v-if="item.priority === 1">重要</div>
                            <div class="status jinji" v-if="item.priority === 2">紧急</div>
                        </div>
                        <div class="remark clamp2">{{ item.notes }}</div>
                        <div class="viewImg">
                            <el-image :src="item.image" :preview-src-list="[item.image]"> </el-image>
                            <!-- <img :src="item.image" alt="" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="domId"></div>
        <div class="footer" v-if="showFilter">
            <div class="title">过滤器列表</div>
            <div class="search">
                <el-input
                    prefix-icon="el-icon-search"
                    v-model="filterName"
                    class="input"
                    placeholder="输入查询"
                ></el-input>
                <div class="cx btn_item" @click="search">查询</div>
                <div class="reset btn_item" @click="reset">重置</div>
                <div class="all blue_item btn_item" @click="allPipei">全部匹配</div>
                <div class="move blue_item btn_item" @click="filterRemove">过滤器迁移</div>
                <div class="creat blue_item btn_item" @click="create">创建过滤器</div>
            </div>
            <div class="lists">
                <el-table :data="itemList" style="width: 100%" height="280" @row-click="rowClick">
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column prop="name" label="关联名称"> </el-table-column>
                    <el-table-column prop="assStatus" label="关联状态">
                        <template slot-scope="scope">
                            {{ scope.row.matchFileids ? "已关联" : "未关联" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="isDisabled" label="匹配状态">
                        <template slot-scope="scope">
                            <div>
                                <el-switch
                                    v-model="scope.row.matStatus"
                                    @change="changeState(scope.row)"
                                    :disabled="scope.row.matStatus"
                                ></el-switch>
                                <!-- {{
                  scope.row.brandCode.search("_") > -1
                    ? scope.row.brandCode.split("_")[0]
                    : scope.row.brandCode
                }} -->
                                {{ scope.row.brandCode }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="关联文件数量">
                        <template slot-scope="scope">
                            {{ scope.row.matchFileids ? scope.row.matchFileids.split(",").length : "0" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="department" label="备注"> </el-table-column>

                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="deletFilter(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 添加规则 -->
            <el-dialog
                title="添加规则"
                :visible.sync="ruleVisible"
                class="dialog"
                :width="width"
                :close-on-click-modal="closeM"
            >
                <div class="mainInfo">
                    <el-form :model="filterForm" :rules="filterRules" ref="filterForm">
                        <el-form-item label="字段" prop="attribute">
                            <el-select
                                v-model="filterForm.attribute"
                                placeholder="请选择"
                                :popper-append-to-body="closeM"
                                popper-class="select-popper"
                                @change="changeAttr"
                            >
                                <el-option label="楼层" value="floor"></el-option>
                                <el-option label="族类别" value="categoryName"></el-option>
                                <el-option label="族名称" value="family"></el-option>
                                <el-option label="族类型" value="familyType"></el-option>
                                <el-option label="系统类型" value="systemType"></el-option>
                                <el-option label="注释" value="注释"></el-option>
                                <el-option label="偏移" value="偏移"></el-option>
                                <el-option label="参照标高" value="参照标高"></el-option>
                                <el-option label="开始偏移" value="开始偏移"></el-option>
                                <el-option label="系统分类" value="系统分类"></el-option>
                                <el-option label="尺寸" value="尺寸"></el-option>
                                <el-option label="宽度" value="宽度"></el-option>
                                <el-option label="长度" value="长度"></el-option>
                                <el-option label="高度" value="高度"></el-option>
                                <el-option label="底部高程" value="底部高程"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="条件" prop="operator">
                            <el-select
                                v-model="filterForm.operator"
                                placeholder="请选择"
                                :popper-append-to-body="closeM"
                                popper-class="select-popper"
                            >
                                <el-option label="等于" value="等于"></el-option>
                                <!-- <el-option label="区域二" value="beijing"></el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="内容"
                            prop="value"
                            class="name formItem"
                            v-if="
                                filterForm.attribute === 'categoryName' ||
                                filterForm.attribute === 'floor' ||
                                filterForm.attribute === 'family' ||
                                filterForm.attribute === 'familyType'
                            "
                        >
                            <el-select
                                v-model="filterForm.value"
                                placeholder="请选择"
                                :popper-append-to-body="closeM"
                                popper-class="select-popper"
                            >
                                <el-option
                                    :label="attr"
                                    :value="attr"
                                    v-for="(attr, i) in filterAttrList"
                                    :key="i"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="内容" prop="value" class="name formItem" v-else>
                            <el-input v-model="filterForm.value" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btns">
                    <el-button @click="cancelRule">取消</el-button>
                    <el-button type="primary" @click="saveRule">确认</el-button>
                </div>
            </el-dialog>
            <!-- 创建过滤器 -->
            <el-dialog
                :title="isEdit ? '编辑过滤器' : '创建过滤器'"
                :visible.sync="dialogVisible"
                class="dialog"
                :width="width"
                :close-on-click-modal="closeM"
            >
                <div class="mainInfo">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="过滤器名称" prop="name" class="name formItem">
                            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <div class="rules">
                            <div class="title">过滤器规则</div>
                            <div class="addRules" @click="addRules">+添加规则</div>
                        </div>
                        <el-table :data="rulesList" style="width: 100%">
                            <el-table-column prop="attribute" label="字段"> </el-table-column>
                            <el-table-column prop="operator" label="条件"> </el-table-column>
                            <el-table-column prop="value" label="值"> </el-table-column>

                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="editRule(scope.row, scope.$index)"
                                        >编辑</el-button
                                    >
                                    <el-button @click.native.prevent="deletRule(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="file">
                            <div class="title">关联文件</div>
                            <div class="addRules" @click="addFilterFile">+添加关联文件</div>
                        </div>
                        <div class="line zjw_center">文件名</div>
                        <div class="selectFileList">
                            <div class="selectFile zjw_center" v-for="(v, i) in tableAllSelectedRow" :key="v.id">
                                {{ v.name }}
                                <div class="delFile" @click="delFile(i)">删除</div>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="btns">
                    <el-button @click="cancelCreate">取消</el-button>
                    <el-button type="primary" @click="saveCreate">确认</el-button>
                </div>
            </el-dialog>

            <el-dialog
                title="过滤器迁移"
                :visible.sync="filterRemoveVisible"
                class="dialog"
                :width="width"
                :close-on-click-modal="closeM"
            >
                <div class="mainInfo">
                    <el-table :data="filterRemoveList" style="width: 100%" height="280">
                        <el-table-column type="index" width="50"> </el-table-column>
                        <el-table-column prop="name" label="集成视图列表"> </el-table-column>

                        <el-table-column prop="email" label="关联文件数量">
                            <template slot-scope="scope">
                                {{ scope.row.count ? scope.row.count : "0" }}
                            </template>
                        </el-table-column>

                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="removeFilter(scope.row)">迁移</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div class="btns" style="margin-top:30px">
            <el-button @click="cancelFilterRemoveVisible">取消</el-button>
            <el-button type="primary" @click="confirmFilterRemoveVisible"
              >确认</el-button
            >
          </div> -->
            </el-dialog>
            <!-- 删除提示 -->
            <zjw-dialog
                :dialogVisible="delVisible"
                :isRest="isRest"
                @cancel="delCancel"
                title="确认提示"
                @deletItem="deleItem"
            ></zjw-dialog>

            <!-- 选择关联文件 -->
            <div>
                <el-dialog
                    title="选择关联文件"
                    :visible.sync="ruleFileVisible"
                    class="dialog"
                    :width="width"
                    :close-on-click-modal="closeM"
                >
                    <div class="mainInfo">
                        <el-select
                            v-model="fileType"
                            :popper-append-to-body="closeM"
                            popper-class="select-popper"
                            placeholder="请选择"
                            @change="changeFileType"
                        >
                            <el-option label="工程文档" value="1"></el-option>
                            <el-option label="运维文档" value="2"></el-option>
                        </el-select>

                        <div class="infoList">
                            <div class="left">
                                <div class="mid">
                                    <div class="tree">
                                        <!-- <el-tree
                    ref="tree"
                    :data="treeList"
                    :props="defaultProps"
                    node-key="id"
                    :highlight-current="highlightCurrent"
                    @node-click="handleLeftclick"
                    @node-contextmenu="rightClick"
                    :filter-node-method="filterNode"
                  > -->
                                        <el-tree
                                            ref="tree"
                                            :expand-on-click-node="false"
                                            :data="engineerTreeList"
                                            :props="defaultProps"
                                            node-key="id"
                                            :highlight-current="highlightCurrent"
                                            @node-click="handleLeftclick"
                                        >
                                        </el-tree>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="tableData">
                                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="Historyrouter.length">
                                        <el-breadcrumb-item v-for="(item, i) in Historyrouter" :key="item.id"
                                            ><span
                                                class="historyRoute"
                                                :class="i === Historyrouter.length - 1 ? 'last-child' : ''"
                                                @click="getSubFolders(item.id)"
                                                >{{ item.name }}</span
                                            ></el-breadcrumb-item
                                        >
                                    </el-breadcrumb>
                                    <!-- <div class="tips" v-if="!tableData.length">
                      暂无数据，请选择其他部门
                    </div> -->
                                    <div>
                                        <el-table
                                            :header-cell-style="{
                                                background: '#eef1f6',
                                                color: '#606266',
                                            }"
                                            ref="multipleTable"
                                            :data="tableData"
                                            row-key="id"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange"
                                            @select="onTableSelect"
                                        >
                                            <el-table-column type="selection" width="55"> </el-table-column>
                                            <el-table-column prop="name" label="文件名">
                                                <template slot-scope="scope">
                                                    <div class="fileInfo" @click.stop="checkFile(scope.row)">
                                                        <img :src="getImg(scope.row)" alt="" class="icon_img" />
                                                        {{ scope.row.name }}
                                                        <div class="stock zjw_center" v-if="scope.row.archived">
                                                            <img
                                                                src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/file/stock.png"
                                                                alt=""
                                                            />
                                                            归档
                                                        </div>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <el-button @click="cancelRuleFile">取消</el-button>
                        <el-button type="primary" @click="confirmRuleFile">确认</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

        <el-dialog title="关联文件列表" :visible.sync="fileListVisible" class="dialog" width="33%">
            <div class="fileNameSearch"></div>
            <div class="fileModList gcwend">
                <div class="title">工程文档</div>
                <div class="fileModItem" v-for="(v, i) in fileModList.filter(v => v.type === 'a')" :key="i">
                    <div class="ind">{{ i + 1 }}</div>
                    <div class="name">{{ v.name }}</div>
                    <div class="time" v-if="isRemove" style="cursor: pointer" @click="delGuanLianFile(v)">删除</div>
                    <!-- <div class="time" v-if="isRemove">工程文档</div> -->
                    <div class="caozuo zjw_center">
                        <div class="dw">
                            <a :href="v.fileUrl">下载</a>
                        </div>
                        <div class="yl" @click="preview(v)">预览</div>
                    </div>
                </div>
            </div>
            <div class="fileModList ywend">
                <div class="title">运维文档</div>
                <div class="fileModItem" v-for="(v, i) in fileModList.filter(v => v.type === 'b')" :key="i">
                    <div class="ind">{{ i + 1 }}</div>
                    <div class="name">{{ v.name }}</div>
                    <div class="time" style="cursor: pointer" @click="delGuanLianFile(v)">删除</div>
                    <!-- <div class="time" v-if="isRemove">运维文档</div> -->
                    <div class="caozuo zjw_center">
                        <div class="dw">
                            <a :href="v.fileUrl">下载</a>
                        </div>
                        <div class="yl" @click="preview(v)">预览</div>
                    </div>
                </div>
            </div>
            <div class="btns" v-if="!isRemove">
                <el-button @click="canceFileListVisible">取消</el-button>
                <el-button type="primary" @click="confirmAppendFileList">确认</el-button>
            </div>
        </el-dialog>
        <el-image-viewer
            z-index="20003"
            v-if="showViewer"
            :on-close="
                () => {
                    showViewer = false
                }
            "
            :url-list="imgList"
        />
        <!-- 关联文件弹窗 -->
        <el-dialog
            title="选择关联文件"
            :visible.sync="guanlianwenjian"
            class="dialog"
            :width="width"
            :close-on-click-modal="closeM"
        >
            <div class="mainInfo">
                <el-select
                    v-model="fileType"
                    :popper-append-to-body="closeM"
                    popper-class="select-popper"
                    placeholder="请选择"
                    @change="changeFileType"
                >
                    <el-option label="工程文档" value="1"></el-option>
                    <el-option label="运维文档" value="2"></el-option>
                </el-select>

                <div class="infoList">
                    <div class="left">
                        <div class="mid">
                            <div class="tree">
                                <!-- <el-tree
                    ref="tree"
                    :data="treeList"
                    :props="defaultProps"
                    node-key="id"
                    :highlight-current="highlightCurrent"
                    @node-click="handleLeftclick"
                    @node-contextmenu="rightClick"
                    :filter-node-method="filterNode"
                  > -->
                                <el-tree
                                    ref="tree"
                                    :expand-on-click-node="false"
                                    :data="engineerTreeList"
                                    :props="defaultProps"
                                    node-key="id"
                                    :highlight-current="highlightCurrent"
                                    @node-click="handleLeftclick"
                                >
                                </el-tree>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="tableData">
                            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="Historyrouter.length">
                                <el-breadcrumb-item v-for="(item, i) in Historyrouter" :key="item.id"
                                    ><span
                                        class="historyRoute"
                                        :class="i === Historyrouter.length - 1 ? 'last-child' : ''"
                                        @click="getSubFolders(item.id)"
                                        >{{ item.name }}</span
                                    ></el-breadcrumb-item
                                >
                            </el-breadcrumb>
                            <!-- <div class="tips" v-if="!tableData.length">
                  暂无数据，请选择其他部门
                </div> -->
                            <div>
                                <el-table
                                    :header-cell-style="{
                                        background: '#eef1f6',
                                        color: '#606266',
                                    }"
                                    ref="multipleTable"
                                    :data="tableData"
                                    row-key="id"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                                    @select="onTableSelect"
                                >
                                    <el-table-column type="selection" width="55"> </el-table-column>
                                    <el-table-column prop="name" label="文件名">
                                        <template slot-scope="scope">
                                            <div class="fileInfo" @click.stop="checkFile(scope.row)">
                                                <img
                                                    :src="
                                                        'https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/icons/' +
                                                        getImg(scope.row)
                                                    "
                                                    alt=""
                                                    class="icon_img"
                                                />
                                                {{ scope.row.name }}
                                                <div class="stock zjw_center" v-if="scope.row.archived">
                                                    <img
                                                        src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/file/stock.png"
                                                        alt=""
                                                    />
                                                    归档
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <el-button @click="cancelRuleFile">取消</el-button>
                <el-button type="primary" @click="confirmRuleFile">确认</el-button>
            </div>
        </el-dialog>
        <div class="sectionBox" v-show="showSectionBox1">
            <div class="title zjw_center">
                <div class="name">剖切盒</div>
                <div class="close" @click="showSectionBox1 = false">
                    <img src="https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/delivery/bim/close.png" alt="" />
                </div>
            </div>
            <div class="buttonLis zjw_center">
                <div
                    class="button zjw_center_j"
                    @mouseover="mouseenter(1)"
                    @mouseleave="mouseout"
                    title="隐藏"
                    @click="hideBox"
                    :class="actInd === 1 ? 'active' : ''"
                >
                    <img v-if="actInd === 1" src="../../assets/images/box.png" alt="" />
                    <img v-else src="../../assets/images/box_active.png" alt="" />
                </div>
                <div
                    @click="fitToModel"
                    class="button zjw_center_j"
                    @mouseover="mouseenter(2)"
                    @mouseleave="mouseout"
                    title="适应到模型"
                    :class="actInd === 2 ? 'active' : ''"
                >
                    <img v-if="actInd === 2" src="../../assets/images/sy.png" alt="" />
                    <img v-else src="../../assets/images/sy_active.png" alt="" />
                </div>
                <div
                    @click="resetSectionBox"
                    class="button zjw_center_j"
                    @mouseover="mouseenter(3)"
                    @mouseleave="mouseout"
                    title="重置"
                    :class="actInd === 3 ? 'active' : ''"
                >
                    <img v-if="actInd === 3" src="../../assets/images/reset.png" alt="" />
                    <img v-else src="../../assets/images/reset_active.png" alt="" />
                </div>
            </div>
        </div>
        <picture-view
            v-if="caijianPictureShow"
            :createdBy="$store.getters.name"
            :homeview="JSON.stringify(viewer3D.getCameraStatus())"
            :sectionBoxState="sectionBox ? sectionBox.getState() : null"
            @cancelPicture="caijianPictureShow = false"
            @getList="getViewList(viewPortInfo)"
        ></picture-view>
        <zjw-dialog
            :dialogVisible="delVisibleView"
            content="是否确认删除该视口"
            @cancel="delCancelView"
            title="确认提示"
            btnCont="确认"
            @deletItem="deleItemView"
        ></zjw-dialog>
    </div>
</template>

<script>
// import treeData from "./txt.json";
// import jiheTree from "./jihe.json";
import zjwDialog from "../Component/zjwDialog.vue"
import pictureView from "./picture.vue"
import {
    getViewToken,
    getBimFaceTree,
    getSetsTree,
    findALLFilter,
    createFilter,
    activeFilter,
    removeFilter,
    activeAllFilter,
    getList,
    copyFilter,
    assSingleFile,
    getAssFiles,
    getFieldList,
    filterElementIds,
    getFilter,
    updateFilter,
    updateState,
    getCameraState,
    cancelSingleFileAssociation,
    getModelsList,
    getViewPortList,
    findAllCreatedBy,
    removeViewPort,
    findViewPort,
    updateViewPort,
    // getThree
} from "@/service/bimMod"
import { getThree, getSubFolders, getOThree, getOSubFolders, getFuFolderList, getOFuFolderList } from "@/service/file"
// import documentVue from '../../components/CKEditor/document.vue';

export default {
    components: {
        zjwDialog,
        "el-image-viewer": () => import("element-ui/packages/image/src/image-viewer"),
        pictureView,
    },
    data() {
        return {
            editId: 0,
            areaId: 0,
            editRules: {
                name: [{ required: true, message: "姓名", trigger: "blur" }],
                priority: [
                    {
                        required: true,
                        message: "请选择优先级",
                        trigger: "change",
                    },
                ],
            },
            editRuleForm: {},
            showEditDio: false,
            caijianPictureShow: false,
            delVisibleView: false,
            viewPortList: [],
            memberList: [],
            viewPortInfo: {
                name: "",
                priority: "",
                createdBy: "",
            },
            viewport: false,
            pictureUrl: null,
            actInd: 0,
            showSectionBox1: false, // 是否显示剖切盒工具栏
            showSectionBox: false, //是否显示剖切盒
            isSectionBoxActivated: false,
            sectionBox: null,
            filterAttrList: [],
            isRemove: false,
            fileListVisible: false, // 关联文件弹窗
            fileModList: [], // 关联文件列表
            isAppend: false, // 是否是zoom
            showFilter: false,
            showMenuTree: false,
            filterRemoveVisible: false,
            filterRemoveList: [], // 过滤器迁移列表
            delVisible: false,
            isRest: false,
            tableAllSelectedId: [],
            tableAllSelectedRow: [], // 关联文件列表
            defaultProps: {
                children: "children",
                label: "name",
            },
            highlightCurrent: true,
            tableData: [],
            engineerTreeList: [], // 工程文档左边树
            fileType: "1", // 1是工程文档，2是运维文档
            ruleFileVisible: false, //选择关联文件
            ruleIndex: "",
            isEdit: false, // 编辑过滤器
            isEditRule: false, // 编辑规则
            filterForm: {
                attribute: "", // 字段
                operator: "", // 条件
                value: "", // 内容
            },
            filterRules: {
                attribute: [{ required: true, message: "请选择", trigger: "change" }],
                operator: [{ required: true, message: "请选择", trigger: "change" }],
                value: [{ required: true, message: "请输入名称", trigger: "blur" }],
            },
            ruleForm: {
                name: "", // 过滤器名称
            },
            rules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }],
            },
            width: "900",
            ruleVisible: false,
            dialogVisible: false, // 控制创建过滤器的
            closeM: false,
            itemList: [], // 过滤器列表数据
            rulesList: [], // 规则列表
            filterName: "",
            activeInd: 0, // 默认是构建
            props: {
                label: "name",
                children: "items",
            },
            jhProps: {
                label: "name",
                children: "instances",
            },
            fileProps: {
                children: "children",
                label: "fileName",
            },
            treeData: [],
            jiheTree: [],
            fileTree: [],
            viewer3D: "",
            ids: [], // 构件id的集合
            multipleSelection: [],
            size: 1000,
            currentPage: 1, // 当前页
            guanlianwenjian: false,
            filterId: "",
            Historyrouter: [],
            showViewer: false,
            imgList: [],
            imgSrcIndex: 0,
            fileName: "",
            nodeData: null,
            jhId: "",
            gjIdLists: [],
            rightInfo: "",
            oldTreeData: [],
            base64String: "",
            priorityList: [
                {
                    name: "一般",
                    id: 0,
                },
                {
                    name: "重要",
                    id: 1,
                },
                {
                    name: "紧急",
                    id: 2,
                },
            ],
        }
    },
    methods: {
        mouseenter(ind) {
            this.actInd = ind
        },
        mouseout() {
            this.actInd = 0
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.editRuleForm.updatedBy = this.$store.getters.userInfo.name
                    console.log(this.editRuleForm, "ruleFormruleForm")
                    const saveInfo = await updateViewPort(this.editRuleForm)
                    console.log(saveInfo)
                    if (saveInfo.success) {
                        this.$notify({
                            title: "成功",
                            message: "修改成功",
                            type: "success",
                            duration: 2000,
                        })
                        this.showEditDio = false
                        this.getViewList(this.viewPortInfo)
                    }
                    // this.ruleForm.modelId =

                    // if (info.success) {
                    //   this.$router.push({ name: "project" });
                    // }
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
        async getEditInfo(item) {
            this.editId = item.id
            this.setArea(item)
            let info = await findViewPort({ id: item.id })
            console.log(info)
            if (info.success) {
                this.showEditDio = true
                this.editRuleForm = info.data.viewPort
                this.base64String = info.data.viewPort.image
            }
        },
        async getMember() {
            const info = await findAllCreatedBy({
                modelId: this.$route.query.id,
            })
            if (info.success) {
                console.log(info)
                this.memberList = info.data.names
            }
        },
        handleClose() {
            this.showEditDio = false
        },
        async rightClick() {
            console.log("我是右键")
            this.isRemove = true
            const info = await getAssFiles({
                id: this.$route.query.id,
                elementId: this.rightInfo.fileId + this.rightInfo.elementId,
                fileName: this.fileName,
            })
            if (info.success) {
                if (info.message === "没有关联文件") {
                    this.$message({
                        message: "没有关联文件",
                        type: "warning",
                    })
                    this.fileListVisible = false
                } else {
                    this.fileListVisible = true
                    this.fileModList = info.data.list
                }
            } else {
                this.$message({
                    message: info.message,
                    type: "warning",
                })
            }
            const rightClick = document.querySelector(".rightClick")
            rightClick.removeEventListener("click", this.rightClick)
            const menu = document.querySelector(".bf-menu-right")
            console.log(menu, "menumenu")
            menu.style.display = "none"
        },
        gjCheckChange(data, isCurrent) {
            console.log(data, isCurrent, "3333333")
            this.ids = []
            this.getIds(data)
            this.ids = this.ids.filter(v => v)
            console.log(this.ids, "idsidsids2")
            const isCheck = this.$refs.gjtreeData.getCheckedNodes().indexOf(data) > -1
            if (!isCheck) {
                // console.log(data, this.ids);
                this.viewer3D.getModel().hideComponentsById(this.ids)
                this.viewer3D.render()
            } else {
                this.viewer3D.getModel().showComponentsById(this.ids)
                this.viewer3D.render()
            }
        },
        // 预览
        preview(data) {
            const extension = data.fileUrl.split(".").pop()
            // console.log(data.fileUrl.split(".").pop(), "22222222");
            const url = data.fileUrl
            let tempImgList = []
            let temp = []
            switch (extension) {
                case "mp3":
                case "ogg":
                case "wav":
                    // 预览音频
                    // eslint-disable-next-line no-case-declarations
                    const audioPlayer = new Audio(url)
                    audioPlayer.controls = true
                    this.previewWindow = window.open("about:blank", "previewWindow", "width=400,height=80")
                    this.previewWindow.document.write(audioPlayer.outerHTML)
                    break
                case "mp4":
                case "webm":
                // eslint-disable-next-line no-duplicate-case, no-fallthrough
                case "ogg":
                    // 预览视频
                    // eslint-disable-next-line no-case-declarations
                    const videoPlayer = document.createElement("video")
                    videoPlayer.src = url
                    videoPlayer.controls = true
                    this.previewWindow = window.open("about:blank", "previewWindow", "width=800,height=600")
                    this.previewWindow.document.write(videoPlayer.outerHTML)
                    break

                case "doc":
                case "docx":
                case "xls":
                case "xlsx":
                case "ppt":
                case "pptx":
                    // 使用 Google Docs Viewer 预览文档
                    // eslint-disable-next-line no-case-declarations
                    // const previewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
                    //   url
                    // )}&embedded=true`;
                    // eslint-disable-next-line no-case-declarations
                    // console.log(url, "const previewUrl");
                    // eslint-disable-next-line no-case-declarations
                    const previewUrl = "https://view.officeapps.live.com/op/view.aspx?src=" + encodeURIComponent(url)
                    this.previewWindow = window.open(previewUrl, "previewWindow", "width=800,height=600")
                    break
                case "pdf":
                    // this.pdfYl = true;
                    var newWin = window.open(
                        "",
                        "newwindow",
                        "toolbar =no, menubar=no, scrollbars=no, resizeable=no, location=no, status=no"
                    )
                    newWin.document.write(
                        `<body scroll="no" 
            style="margin: 0px;padding: 0px;border:0px;overflow:hidden;">
            <iframe style="margin: 0px;padding: 0px;border: 0px;width:100%;height:100%" 
            src="/web/viewer.html?file=${url}"></iframe></body>`
                    )

                    // eslint-disable-next-line no-case-declarations
                    // const pdfsrc = url;
                    // this.pdfsrc = pdf.createLoadingTask(encodeURIComponent(pdfsrc),{withCredentials: false});
                    break
                case "jpg":
                case "jpeg":
                case "png":
                case "gif":
                    // 直接预览图片
                    // this.previewWindow = window.open(
                    //   "about:blank",
                    //   "previewWindow",
                    //   "width=800,height=600"
                    // );
                    // // eslint-disable-next-line no-case-declarations
                    // const content = `<img src="${url}" width="100%" height="100%" alt="预览图">`;
                    // this.previewWindow.document.write(content);
                    this.showViewer = true
                    this.imgList = this.fileModList
                        .map(v => {
                            // console.log(v, "222  qq");
                            if (
                                v.name.split(".")[1] === "jpg" ||
                                v.name.split(".")[1] === "jpeg" ||
                                v.name.split(".")[1] === "png" ||
                                v.name.split(".")[1] === "gif"
                            ) {
                                return v.fileUrl
                            }
                        })
                        .filter(v => v)
                    // // console.log(this.imgList,'ssssasasas');
                    // // eslint-disable-next-line no-debugger
                    // debugger;
                    this.imgList.forEach((item, index) => {
                        if (data.fileUrl === item) {
                            this.imgSrcIndex = index
                        }
                    })
                    tempImgList = [...this.imgList]

                    for (let i = 0; i < this.imgSrcIndex; i++) {
                        temp.push(tempImgList.shift())
                    }
                    this.imgList = tempImgList.concat(temp)
                    // console.log(this.imgList, "imgList");

                    break
                default:
                    // 无法预览该类型的文件
                    this.$message({
                        message: "暂时不支持该文件类型的在线预览",
                        type: "warning",
                    })
                    // console.log(`不支持 ${extension} 文件类型的在线预览`);
                    break
            }
        },
        async rowClick(row) {
            // console.log(row);
            const info = await filterElementIds({
                id: row.id,
            })
            if (info.success) {
                // console.log(info);
                let id = info.data.hostIds
                this.zoomToSelectedComponents(id)
            }
        },
        async changeAttr(val) {
            // console.log(val);
            if (val === "floor" || val === "categoryName" || val === "family" || val === "familyType") {
                const info = await getFieldList({
                    id: this.$route.query.id,
                    field: val,
                })
                // console.log(info);
                if (info.success) {
                    this.filterAttrList = info.data.list
                }
            }
        },
        closeListTree() {
            this.showMenuTree = false
        },
        changeFilter() {
            this.showFilter = !this.showFilter
        },
        changeMenu() {
            this.showMenuTree = !this.showMenuTree
        },
        changeViewport() {
            this.viewport = !this.viewport

            // this.changeMenu();
        },
        // 迁移
        async removeFilter(row) {
            const info = await copyFilter({
                id: this.$route.query.id,
                integrateId: row.integrateId,
            })
            if (info.success) {
                this.$message({
                    message: "迁移成功",
                    type: "success",
                })
            }
        },
        // 过滤器迁移
        async filterRemove() {
            this.filterRemoveVisible = true
            const info = await getList()
            // console.log(info);
            if (info.success) {
                this.filterRemoveList = info.data.list
            }
        },
        cancelFilterRemoveVisible() {
            this.filterRemoveVisible = false
        },
        // 全部匹配
        async allPipei() {
            const info = await activeAllFilter({
                id: this.$route.query.id,
            })
            if (info.success) {
                this.$message({
                    message: "操作成功",
                    type: "success",
                })
                this.findALLFilter()
            }
        },
        delFile(i) {
            this.tableAllSelectedId.splice(i, 1)
            this.tableAllSelectedRow.splice(i, 1)
        },
        delCancel() {
            this.delVisible = false
        },
        delCancelView() {
            this.delVisibleView = false
        },
        // 删除
        deletFilter(res) {
            // console.log(res);
            this.id = res.id
            // this.isRest = false;
            this.delVisible = true
        },
        deletViewPort(res) {
            console.log(res)
            this.id = res.id
            // this.isRest = false;
            this.delVisibleView = true
        },
        async deleItem() {
            this.delVisible = false
            const parmas = {
                id: this.id,
            }
            const data = await removeFilter(parmas)
            // console.log(data, "删除信息");
            if (data.success) {
                // this.$refs.search.getList();
                this.findALLFilter()
            }
        },
        async deleItemView() {
            this.delVisibleView = false
            const parmas = {
                id: this.id,
            }
            const data = await removeViewPort(parmas)
            // console.log(data, "删除信息");
            if (data.success) {
                // this.$refs.search.getList();
                this.getViewList(this.viewPortInfo)
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            // console.log(this.multipleSelection);
            val.forEach(item => {
                item.fileManageType = this.fileType
                if (this.tableAllSelectedId.indexOf(item.id) === -1) {
                    this.tableAllSelectedId.push(item.id)
                    this.tableAllSelectedRow.push(item)
                }
            })
        },
        onTableSelect(rows, row) {
            // 判断是点击了表格勾选还是取消勾选
            // true就是选中，0或者false是取消选中
            const selected = rows.length && rows.indexOf(row) !== -1
            if (!selected) {
                // 如果点击取消勾选
                const index = this.tableAllSelectedId.indexOf(row.id)
                this.tableAllSelectedId.splice(index, 1) // 取消勾选，则删除id
                this.tableAllSelectedRow.splice(index, 1) // 取消勾选，则删除数据
            }
        },
        checkFile(data) {
            if (data?.type === "file") {
                // 这是文件
            } else {
                // 这是文件夹

                this.handleLeftclick(data)
            }
        },
        handleLeftclick(data) {
            // // console.log(data, 111);
            this.row = {}
            this.depId = data.id
            this.depName = data.name
            if (data.id) {
                this.getSubFolders()
            }
        },
        async getSubFolders(id = this.depId) {
            this.$refs.tree.setCurrentKey(id)
            const params = {
                id,
                limit: this.size,
                page: this.currentPage,
                // hostType:0
            }
            if (this.fileType === "1") {
                const res = await getSubFolders(params)
                const Historyrouter = await getFuFolderList({
                    id,
                })
                this.depId = id
                if (Historyrouter.success) {
                    this.Historyrouter = Historyrouter.data.list.reverse()
                } else {
                    this.Historyrouter = []
                }
                // // console.log(res, "zjjjjjjjjjjjjjjjj");
                if (res.success) {
                    this.tableData = res.data.items.filter(v => {
                        return v.type === "file"
                    })
                    this.$nextTick(() => {
                        this.tableData.forEach(item => {
                            if (this.tableAllSelectedId.indexOf(item.id) > -1) {
                                this.$refs.multipleTable.toggleRowSelection(item, true)
                            } else {
                                this.$refs.multipleTable.toggleRowSelection(item, false)
                                // // console.log('去除勾选:', item)
                            }
                        })
                    })
                }
            } else {
                const res = await getOSubFolders(params)
                const Historyrouter = await getOFuFolderList({
                    id,
                })
                this.depId = id
                if (Historyrouter.success) {
                    this.Historyrouter = Historyrouter.data.list.reverse()
                } else {
                    this.Historyrouter = []
                }
                // console.log(res, "w4444444444444444");
                if (res.success) {
                    this.tableData = res.data.items.filter(v => {
                        return v.type === "file"
                    })
                    this.$nextTick(() => {
                        this.tableData.forEach(item => {
                            if (this.tableAllSelectedId.indexOf(item.id) > -1) {
                                this.$refs.multipleTable.toggleRowSelection(item, true)
                            } else {
                                this.$refs.multipleTable.toggleRowSelection(item, false)
                                // // console.log('去除勾选:', item)
                            }
                        })
                    })
                }
            }
        },

        async getEngineerThree() {
            if (this.fileType === "1") {
                const res = await getThree()
                // console.log(res, "111");
                if (res.success) {
                    this.engineerTreeList = res.data?.list?.body
                    // let keyArr = [];
                    // keyArr.push(this.engineerTreeList[0].id.toString());
                    // this.checkedKey = keyArr;
                }
            } else {
                const res = await getOThree()
                // console.log(res, "111");
                if (res.success) {
                    this.engineerTreeList = res.data?.list?.body
                    // let keyArr = [];
                    // keyArr.push(this.engineerTreeList[0].id.toString());
                    // this.checkedKey = keyArr;
                }
            }
        },
        changeFileType(type) {
            // console.log(type, "type");
            this.fileType = type
            this.getEngineerThree()
            // this.getSubFolders();
        },
        // 选择文件弹窗打开
        addFilterFile() {
            this.ruleFileVisible = true
            this.tableData = []
            if (this.tableData.length) {
                // this.$nextTick(() => {
                //   this.tableData.forEach((item) => {
                //     if (this.tableAllSelectedId.indexOf(item.id) > -1) {
                //       this.$refs.multipleTable.toggleRowSelection(item, true);
                //     } else {
                //       this.$refs.multipleTable.toggleRowSelection(item, false);
                //       // // console.log('去除勾选:', item)
                //     }
                //   });
                // });
            }
        },
        // 关联
        append() {
            this.isRemove = false
            this.isAppend = true // 开启zoom
            // this.ruleFileVisible = true;
            this.guanlianwenjian = true
        },
        // 选择文件的取消
        cancelRuleFile() {
            this.ruleFileVisible = false
            this.guanlianwenjian = false
            // this.tableAllSelectedRow = [];
            // this.tableAllSelectedId = [];
            this.$refs.multipleTable.clearSelection()
            // this.$refs.guanlianwenjianTable.clearSelection();
            this.isAppend = false
        },
        // 关联文件列表取消
        canceFileListVisible() {
            this.fileListVisible = false
            this.isAppend = false
        },
        // 确定关联
        async confirmAppendFileList() {
            const info = await assSingleFile({
                fileIds: this.fileModList
                    .map(v => {
                        if (v.fileId.startsWith("a") || v.fileId.startsWith("b")) {
                            return v.fileId
                        } else {
                            if (v.fileManageType === "1") {
                                v.fileId = "a" + v.fileId
                            } else {
                                v.fileId = "b" + v.fileId
                            }
                            return v.fileId
                        }
                    })
                    .join(","),
                id: this.$route.query.id,
                elementIds: this.ids
                    .map(v => {
                        return v.split(".")[1]
                    })
                    .join(","),
            })
            // console.log(info);
            this.fileModList = []
            this.tableAllSelectedRow = []
            this.tableAllSelectedId = []
            if (info.success) {
                this.$message({
                    message: "关联成功",
                    type: "success",
                })
            }
            this.canceFileListVisible()
        },
        confirmRuleFile() {
            this.ruleFileVisible = false
            this.guanlianwenjian = false

            this.$refs.multipleTable && this.$refs.multipleTable.clearSelection()
            // this.$refs.guanlianwenjianTable&&this.$refs.guanlianwenjianTable.clearSelection();
            if (this.isAppend) {
                this.fileListVisible = true
                this.fileModList = JSON.parse(JSON.stringify(this.tableAllSelectedRow))
            }
        },
        resetFilterForm() {
            this.filterForm = {
                attribute: "",
                operator: "",
                value: "",
            }
        },
        saveRule() {
            // // console.log("保存规则");
            this.$refs["filterForm"].validate(valid => {
                if (valid) {
                    if (!this.isEditRule) {
                        this.rulesList.push(this.filterForm)
                    } else {
                        // console.log(this.ruleIndex, "this.ruleIndexthis.ruleIndex");
                        // this.rulesList[this.ruleIndex] = this.filterForm;
                        this.$set(this.rulesList, this.ruleIndex, this.filterForm)
                    }
                    this.resetFilterForm()
                    this.cancelRule()
                    this.isEditRule = false
                } else {
                    // console.log("error submit!!");
                    return false
                }
            })
        },

        addRules() {
            this.isEditRule = false
            this.ruleVisible = true
        },
        cancelRule() {
            this.ruleVisible = false
            this.isEditRule = false
        },
        cancelCreate() {
            this.ruleForm.name = ""
            this.rulesList = []
            this.tableAllSelectedRow = []
            this.tableAllSelectedId = []
            this.dialogVisible = false
        },
        // 确认创建（编辑）过滤器
        saveCreate() {
            this.$refs["ruleForm"].validate(async valid => {
                if (valid) {
                    const matchFileids = this.tableAllSelectedRow.map(v => {
                        if (v.id.startsWith("a") || v.id.startsWith("b")) {
                            return v.id
                        } else {
                            if (v.fileManageType === "1") {
                                v.id = "a" + v.id
                            } else if (v.fileManageType === "2") {
                                v.id = "b" + v.id
                            }
                            return v.id
                        }
                    })
                    if (!this.isEdit) {
                        const info = await createFilter({
                            ruleVos: this.rulesList,
                            filterVo: {
                                id: this.$route.query.id,
                                name: this.ruleForm.name,
                                matchFileids: matchFileids.join(","),
                            },
                        })
                        // console.log(info);
                        if (info.success) {
                            this.$message({
                                message: "创建成功",
                                type: "success",
                            })
                            this.dialogVisible = false
                            this.findALLFilter()
                        }
                    } else {
                        // 这里是编辑过滤器保存
                        const info = await updateFilter({
                            ruleVos: this.rulesList,
                            filterVo: {
                                id: this.filterId,
                                name: this.ruleForm.name,
                                matchFileids: matchFileids.join(","),
                            },
                        })
                        // console.log(info);
                        if (info.success) {
                            this.$message({
                                message: "创建成功",
                                type: "success",
                            })
                            this.dialogVisible = false
                            this.findALLFilter()
                            this.isEdit = false
                        }
                    }
                } else {
                    // console.log("error submit!!");
                    return false
                }
            })
        },
        // 创建过滤器
        create() {
            this.isEdit = false
            this.dialogVisible = true
            this.ruleForm.name = ""
            this.rulesList = []
            this.tableAllSelectedRow = []
            this.tableAllSelectedId = []
        },
        async getViewList(res) {
            const info = await getViewPortList({
                modelId: this.$route.query.id,
                createdBy: res.createdBy,
                name: res.name,
                priority: res.priority,
            })
            console.log(info)
            this.viewPortList = info.data.list
            this.getMember()
        },
        async findALLFilter() {
            const info = await findALLFilter({
                name: this.filterName,
                id: this.$route.query.id,
            })
            // console.log(info);
            if (info.success) {
                this.itemList = info.data.list
            }
        },

        search() {
            this.findALLFilter()
        },

        deletRule(index) {
            this.rulesList.splice(index, 1)
        },

        async changeState(row) {
            let info = await activeFilter({
                id: row.id,
            })
            // console.log(info);
            if (info.success) {
                this.$message({
                    message: "匹配成功",
                    type: "success",
                })
            }
        },
        async edit(row) {
            // console.log(row);

            this.row = row
            this.isEdit = true
            this.dialogVisible = true
            this.ruleForm.name = row.name
            this.rulesList = JSON.parse(row.rules)
            this.filterId = row.id
            const info = await getFilter({ ids: row.matchFileids })
            // console.log(info, "55666");
            if (info.success) {
                this.tableAllSelectedRow = info.data.list
                this.tableAllSelectedId = info.data.list.map(v => v.id.slice(1))
            }
        },
        editRule(row, index) {
            this.isEditRule = true
            this.ruleIndex = index

            // console.log(row);
            this.ruleVisible = true
            this.filterForm = JSON.parse(JSON.stringify(row))
        },
        // 重置
        reset() {
            this.filterName = ""
            this.findALLFilter()
        },
        successCallback(viewMetaData) {
            var that = this
            let dom4Show = document.getElementById("domId")
            let webAppConfig =
                // eslint-disable-next-line no-undef
                new Glodon.Bimface.Application.WebApplication3DConfig()
            webAppConfig.domElement = dom4Show
            // 设置全局单位
            webAppConfig.globalUnit =
                // eslint-disable-next-line no-undef
                Glodon.Bimface.Common.Units.LengthUnits.Meter
            //是否设置默认为全透明
            webAppConfig.backgroundColor = [
                {
                    // eslint-disable-next-line no-undef
                    color: new Glodon.Web.Graphics.Color(25, 28, 33, 0),
                },
            ]
            // eslint-disable-next-line no-undef
            // webAppConfig.globalUnit = Glodon.Bimface.Common.Units.LengthUnits.Millimeter;
            webAppConfig.enableLogarithmicDepthBuffer = true
            // eslint-disable-next-line no-undef
            var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig)
            // webAppConfig.globalUnit =
            //   Glodon.Bimface.Common.Units.LengthUnits.Millimeter();
            app.addView(viewMetaData.viewToken)
            var viewer3D = app.getViewer()
            that.viewer3D = viewer3D
            // (viewer3D.getUnit(),'单位');
            viewer3D.addEventListener(
                // eslint-disable-next-line no-undef
                Glodon.Bimface.Viewer.Viewer3DEvent.ComponentsSelectionChanged,
                function (componentData) {
                    if (componentData && componentData.objectId) {
                        console.log(componentData)

                        // // console.log(that.$refs.gjtreeData, "22222222");
                        that.expandNodes(that.$refs["gjtreeData"].store.nodesMap[componentData.objectId.split(".")[1]])
                        that.$refs.gjtreeData.setCurrentKey(componentData.objectId.split(".")[1])
                        setTimeout(function () {
                            that.selectedRegion(componentData.objectId.split(".")[1])
                        }, 500)
                    }
                }
            )
            viewer3D.addEventListener(
                // eslint-disable-next-line no-undef
                Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
                async function () {
                    // 调用viewer3D对象的Method，可以继续扩展功能
                    //自适应屏幕大小
                    if (window.location.hash.split("id=")[1]) {
                        const info = await getCameraState({
                            id: window.location.hash.split("id=")[1],
                        })
                        // console.log(info, "mainInfo");
                        let cameraState = ""
                        if (info.success) {
                            cameraState = JSON.parse(info.data.cameraState)
                        }
                        // console.log(cameraState, "cameraStatecameraState");
                        if (cameraState) {
                            viewer3D.setCameraStatus(cameraState)
                            viewer3D.recordCustomHomeview(cameraState)
                        }

                        document.querySelector(".bf-view").style.background =
                            "url('https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/login/bg.png')"
                        document.querySelector(".bf-view").style.backgroundSize = "cover"
                        window.onresize = function () {
                            viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight)
                        }
                        // 渲染3D模型
                        viewer3D.render()
                        // console.log("加载完成");
                        // const home = documentVue.querySelectorAll('.gld-bf-home')[0];
                        const cuttingImageDiv = document.createElement("div")
                        cuttingImageDiv.classList.add("gld-bf-sectionboxZjw")
                        cuttingImageDiv.classList.add("bf-button")
                        cuttingImageDiv.title = "剖切盒"
                        cuttingImageDiv.addEventListener("click", that.handleCuttingImageClick)
                        const mainViewButton = document.querySelector(".gld-bf-measure")
                        const zoomInButton = document.querySelector(".gld-bf-firstperson")
                        mainViewButton.parentNode.insertBefore(cuttingImageDiv, zoomInButton)
                        setTimeout(function () {
                            let xiala = document.querySelectorAll(".bf-menu-svg")[0]
                            // console.log(xiala, "3334");
                            const id = window.location.hash.split("id=")[1]
                            const fn = function () {
                                let setMainView = document.querySelectorAll(".bf-menu-item1")[2]
                                setMainView.addEventListener("click", async function () {
                                    const homeview = viewer3D.getCameraStatus()
                                    viewer3D.recordCustomHomeview(homeview)
                                    viewer3D.render()
                                    // console.log(homeview, "homeviewhomeview");
                                    const info = await updateState({
                                        id,
                                        cameraState: JSON.stringify(homeview),
                                    })
                                    console.log(info)
                                })
                                xiala.removeEventListener("click", fn)
                            }
                            xiala.addEventListener("click", fn)
                        }, 1000)
                    } else {
                        return
                    }
                }
            )
            // // eslint-disable-next-line no-undef
            // viewer3D.addEventListener(
            //   // eslint-disable-next-line no-undef
            //   Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
            //   function () {
            //     that.viewAdded = true;
            //     //自适应屏幕大小
            //     window.onresize = function () {
            //       viewer3D.resize(
            //         document.documentElement.clientWidth,
            //         document.documentElement.clientHeight - 40
            //       );
            //     };
            //     // 渲染场景
            //     viewer3D.render();
            //   }
            // );
            viewer3D.addEventListener(
                // eslint-disable-next-line no-undef
                Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked,
                function (componentData) {
                    console.log(componentData)
                    setTimeout(() => {
                        console.log("右击")
                        const menu = document.querySelector(".bf-menu-right")
                        if (menu) {
                            if (menu.children.length > 2) {
                                that.rightInfo = componentData
                                const newMenuItem = document.createElement("div")
                                newMenuItem.classList.add("bf-menu-item")
                                newMenuItem.classList.add("rightClick")
                                newMenuItem.textContent = "查看关联文件"
                                newMenuItem.addEventListener("click", that.rightClick)

                                menu.appendChild(newMenuItem)
                            }
                        }
                    }, 0)
                }
            )
        },
        // 创建视口
        caijian() {
            console.log("我是剪刀")
            console.log(this.$store)
            const color = this.viewer3D.getBackgroundColor()
            console.log(color, "11111111")
            // this.viewer3D.enableContactShadow(true);
            let that = this
            // const newColor = new window.Glodon.Web.Graphics.Color(25, 28, 33, 1);
            // console.log(newColor,'newColornewColor');
            this.viewer3D.createSnapshotAsync(color[0], function (data) {
                that.pictureUrl = data
                localStorage.setItem("pictureUrl", that.pictureUrl)
                console.log(that.$store.getters.name, "userInfo")
                that.caijianPictureShow = true
                // that.$router.push({
                //   name: "picture",
                //   params: {
                //     modelId: that.$route.query.id,
                //     userNmae: that.$store.getters.userInfo.name,
                //     homeview: JSON.stringify(that.viewer3D.getCameraStatus()),
                //   },
                // });
            })
        },
        setArea(item) {
            console.log(item)
            this.areaId = item.id
            this.editId = item.id
            // this.itemActiveInd = item.id;
            var cameraState = item.cameraState
            cameraState = JSON.parse(cameraState)
            console.log(cameraState, "cameraState")
            if (cameraState) {
                this.viewer3D.setCameraStatus(cameraState)
                // this.viewer3D.recordCustomHomeview(cameraState);
            }
            if (item.sectionState) {
                if (!this.isSectionBoxActivated) {
                    this.showSectionBoxFunction()
                    this.showSectionBox1 = true
                }
                let sectionState = JSON.parse(item.sectionState)
                this.sectionBox.setState(sectionState)
            } else {
                if (this.sectionBox) {
                    if (!this.isSectionBoxActivated) {
                        this.showSectionBoxFunction()
                    }
                    this.sectionBox.reset()
                    this.viewer3D.render()
                    this.sectionBox.hideBox()
                    this.showSectionBox1 = false
                }
            }
        },
        hideBox() {
            if (!this.isSectionBoxActivated) {
                this.sectionBox.showBox()
            } else {
                this.sectionBox.hideBox()
            }
            this.isSectionBoxActivated = !this.isSectionBoxActivated
        },
        fitToModel() {
            if (!this.isSectionBoxActivated) {
                this.showSectionBoxFunction()
            }
            this.sectionBox.fitToModel()
        },
        resetSectionBox() {
            if (!this.isSectionBoxActivated) {
                this.showSectionBoxFunction()
            }
            this.sectionBox.reset()
            this.viewer3D.render()
        },
        showSectionBoxFunction() {
            if (!this.isSectionBoxActivated) {
                if (!this.sectionBox) {
                    let sectionBoxConfig = new window.Glodon.Bimface.Plugins.Section.SectionBoxConfig()
                    sectionBoxConfig.viewer = this.viewer3D
                    this.sectionBox = new window.Glodon.Bimface.Plugins.Section.SectionBox(sectionBoxConfig)
                    this.showSectionBox1 = true
                } else {
                    this.sectionBox.showBox()
                    this.showSectionBox1 = true
                }
            } else {
                this.sectionBox.hideBox()
                this.showSectionBox1 = false
            }
            this.viewer3D.render()
            this.isSectionBoxActivated = !this.isSectionBoxActivated
        },
        handleCuttingImageClick() {
            console.log("打开剖切后")
            // this.showSectionBox = !this.showSectionBox;
            // if(this.showSectionBox){
            //   this.showSectionBox1=true;
            // }else{
            //   this.showSectionBox1 = false;
            // }

            this.showSectionBoxFunction()
            let sectionBoxState = this.sectionBox.getState()
            console.log(sectionBoxState, "sectionBoxState")
        },
        failureCallback(error) {
            console.log(error)
        },
        changeTab(tab) {
            this.activeInd = tab
            // if (tab === 1 && !this.jiheTree.length) {
            //   jiheTree.groups.forEach((v) => {
            //     v.instances = v.types;
            //   });
            //   this.jiheTree = jiheTree.groups;
            //   console.log(this.jiheTree, "this.jiheTree");
            // }
        },
        expandNodes(node) {
            if (null != node.parent) {
                this.expandNodes(node.parent)
            }
            node.expanded = true
        },
        selectedRegion(id) {
            // console.log(id, "idid");
            // 通过Id获取到对应的dom元素
            const node = document.getElementById(id)
            setTimeout(() => {
                if (node) {
                    this.$nextTick(() => {
                        // 通过scrollIntoView方法将对应的dom元素定位到可见区域 【block: 'center'】这个属性是在垂直方向居中显示
                        node.scrollIntoView({ block: "center" })
                    })
                }
            }, 100)
        },
        // 构建定位
        zoomToSelectedComponents(id) {
            // id = id.map((v) => {
            //   return "10000812046173." + v;
            // });
            this.viewer3D.getModel().clearSelectedComponents()
            // console.log(id, "idididididid");
            this.viewer3D.getModel().setSelectedComponentsById(id)
            this.viewer3D.getModel().zoomToSelectedComponents()
            // eslint-disable-next-line no-undef
            // let color = new Glodon.Web.Graphics.Color("#11DAB7", 0.9);
            // this.viewer3D.getModel().overrideComponentsColorById(id, color);
            // this.viewer3D.render();
            // 清除构件选中状态
        },
        handleNodeClick(data) {
            console.log(data, "点击构件")
            this.viewer3D.getModel().restoreComponentsColorById(this.ids)
            this.viewer3D.render()
            this.ids = []
            this.getIds(data)
            this.ids = this.ids.filter(v => v)
            // console.log(this.ids, "idsidsids");
            this.zoomToSelectedComponents(this.ids)
        },
        fileNodeClick(node) {
            console.log(node)
        },
        fileCheckChange(data, isCurrent) {
            console.log(data, isCurrent)
            if (data.id !== 1 && !isCurrent) {
                this.viewer3D.getModel().hideComponentsByObjectData([
                    {
                        fileId: data.id,
                    },
                ])
            } else if (data.id !== 1 && isCurrent) {
                this.viewer3D.getModel().showComponentsByObjectData([
                    {
                        fileId: data.id,
                    },
                ])
            }
        },
        async delGuanLianFile(v) {
            let { elementId, fileId, tableName, name, type, fileUrl } = v
            // console.log(v);
            const data = {
                elementId,
                fileId,
                tableName,
                name,
                type,
                fileUrl,
            }
            const res = await cancelSingleFileAssociation(data)
            // console.log(res, "删除后的数据");
            if (res.success) {
                this.$message({
                    message: "删除成功",
                    type: "success",
                })
                this.isRemove = true
                const info = await getAssFiles({
                    id: this.$route.query.id,
                    elementId: this.nodeData.fileId + this.nodeData.id,
                    fileName: this.fileName,
                })
                // console.log(info);
                if (info.success) {
                    if (info.message === "没有关联文件") {
                        this.$message({
                            message: "没有关联文件",
                            type: "warning",
                        })
                        this.fileListVisible = false
                    } else {
                        this.fileListVisible = true
                        this.fileModList = info.data.list
                    }
                } else {
                    this.$message({
                        message: info.message,
                        type: "warning",
                    })
                }
            }
            // this.fileModList.splice(i, "1");
        },

        // 打开关联文件列表
        async remove(node, data) {
            this.nodeData = data
            this.fileModList = []
            this.isRemove = true
            const info = await getAssFiles({
                id: this.$route.query.id,
                elementId: this.nodeData.fileId + this.nodeData.id,
                fileName: this.fileName,
            })
            // console.log(info);
            if (info.success) {
                if (info.message === "没有关联文件") {
                    this.$message({
                        message: "没有关联文件",
                        type: "warning",
                    })
                    this.fileListVisible = false
                    return
                } else {
                    this.fileListVisible = true
                    this.fileModList = info.data.list
                }
            } else {
                this.$message({
                    message: info.message,
                    type: "warning",
                })
            }
        },
        getImg(data) {
            let suffix = ""
            if (data?.type === "file") {
                if (this.fileType === "1") {
                    suffix = data?.engDetails?.suffix.split(".")[1] + ".png"
                } else {
                    suffix = data?.operateDetails?.suffix.split(".")[1] + ".png"
                }

                // console.log(suffix, "suffixsuffix");
            } else {
                suffix = "dir.png"
            }
            try {
                return "https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/icons/" + suffix
            } catch (e) {
                return "https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/icons/bim.png"
            }
            // return suffix;
        },

        getIds(obj) {
            if (Object.prototype.hasOwnProperty.call(obj, "items")) {
                for (const item of obj.items) {
                    if (!Object.prototype.hasOwnProperty.call(item, "items")) {
                        // console.log("我进来了吗");
                        this.ids.push(item.fileId + "." + item.id)
                    } else {
                        this.getIds(item)
                    }
                }
                this.getIds(obj.items)
            } else {
                if (Object.prototype.toString.call(obj.id) === "[object Array]") {
                    // console.log(obj, "objjjjjjjjjjjjjjj");
                    this.ids = obj.instances[0].elements
                } else {
                    // 这是单构件
                    // console.log(obj, "obj");
                    if ("fileId" in obj) {
                        this.ids.push(obj.fileId + "." + obj.id)
                    } else if ("elements" in obj) {
                        obj.elements.forEach(ele => {
                            this.ids.push(ele)
                        })
                    } else {
                        this.ids.push(obj.id)
                    }
                }

                return null
            }
        },
        hasItem(v) {
            if ("items" in v && v.items.length) {
                // 如果有items，都复制父name
                v.items.forEach(val => {
                    val.parentName = v.name
                    if ("elementIds" in val) {
                        const info = []
                        v.ids = val.elementIds
                        val.name = v.parentName
                        val.elementIds.forEach(valval => {
                            // // console.log(v, "vvv");

                            info.push({
                                name: v.parentName + valval,
                                id: valval,
                                fileId: val.fileId,
                            })
                            v.items = info
                            // v.items.shift();
                        })
                        // v.items.shift();
                    } else {
                        this.hasItem(val)
                    }
                })
            } else {
                // // console.log(v, "00000000000000000");
            }
        },
        hasElements(v) {
            if ("types" in v) {
                v.types.forEach(typeItem => {
                    typeItem.oldId = typeItem.id
                })
            }

            const newIds = []
            if ("instances" in v && v.instances.length) {
                // 如果有items，都复制父name
                v.instances.forEach(val => {
                    if ("elements" in val) {
                        newIds.push(val.elements[0])
                        val.name = val.elements[0]
                        val.id = val.elements[0]

                        // v.items.shift();
                    } else {
                        this.hasElements(val)
                    }
                    v.id = newIds
                })
            } else {
                // // console.log(v, "00000000000000000");
            }
        },
        async getEleTree() {
            const info = await getBimFaceTree({
                id: this.$route.query.id,
            })
            // // console.log(info, "getEleTreegetEleTree");
            this.treeData = JSON.parse(info.data.tree).data
            this.treeData.forEach(v => {
                this.hasItem(v)
            })
            this.gjIdLists = this.treeData.map(v => v.id)
        },
        async getJHEleTree() {
            const info = await getSetsTree({
                id: this.$route.query.id,
            })
            // // console.log(info, "getJHEleTreegetJHEleTreegetJHEleTree");
            const jiheTree = JSON.parse(info.data.tree)
            jiheTree.groups.forEach(v => {
                v.instances = v.types
            })
            this.jiheTree = jiheTree.groups
            this.jiheTree.forEach(v => {
                this.hasElements(v)
            })
            // this.treeData = JSON.parse(info.data.tree).data;
            // this.treeData.forEach((v) => {
            //   this.hasItem(v);
            // });
        },
        async getFileTree() {
            // console.log("咋回事");
            const info = await getModelsList({
                id: this.$route.query.id,
            })
            //  const fileTree = JSON.parse(info.data.list);
            // console.log(info, "hejjj");
            info.data.list.forEach(v => {
                v.id = v.fileId
            })
            if (info.success) {
                this.fileTree = [
                    {
                        fileName: "全部文件",
                        id: 1,
                        children: info.data.list,
                    },
                ]
            }
        },
    },

    async mounted() {
        // 获取工程文档树结构
        this.getEngineerThree()
        var that = this
        const info = await getViewToken({
            id: this.$route.query.id,
        })
        if (info.success) {
            this.viewToken = info.data.viewToken
        }
        // 获取构件树
        this.getEleTree()
        this.getJHEleTree()
        console.log(this.getFileTree, "11")
        this.getFileTree()
        this.findALLFilter()
        // eslint-disable-next-line no-undef
        let loaderConfig = new BimfaceSDKLoaderConfig()
        // loaderConfig.viewToken = '78f1a50dc92d41c092485708a34e2f08';
        loaderConfig.viewToken = this.viewToken
        // eslint-disable-next-line no-undef
        BimfaceSDKLoader.load(loaderConfig, that.successCallback, that.failureCallback)
        this.getViewList(this.viewPortInfo)
        this.getMember()
    },
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
/deep/ .el-dialog__title {
    color: #4a4a4c;
    display: flex;
    justify-content: space-between;

    text-shadow: 0px 3px 4px rgba(9, 29, 32, 0.4);
    background: linear-gradient(180deg, #c5f0f5 0%, #3ae2f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
/deep/ .el-dialog__body .title {
    color: white !important;
}
/deep/ .el-form-item__content img {
    width: 160px;
    height: 90px;
}
/deep/ .el-form-item__content .el-input__inner {
    width: 350px !important;
    height: 3.33vh;
}
/deep/ .el-form-item__label {
}
.rightFilter {
    position: absolute;
    width: 410px;
    right: 0;
    top: 10px;
    height: 80vh;
    border-radius: 0px 0px 0px 0px;
    background: #ffffff;
    padding: 1.86vh 20px;
    z-index: 999;
    background: rgba(9, 29, 32, 0.8) !important;
    box-shadow: inset 0 0 0.046875rem 0 #17bdd3;
    border-radius: 0.020833rem 0.020833rem 0.020833rem 0.020833rem;
    opacity: 1;
    border: 0.005208rem solid !important;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1 !important;
    /deep/ .el-icon-search:before {
        color: #4a4a4c;
        text-shadow: 0px 3px 4px rgba(9, 29, 32, 0.4);
        background: linear-gradient(180deg, #c5f0f5 0%, #3ae2f9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    // overflow-y: scroll;
    .title {
        font-size: 16px;
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
        color: #4a4a4c;
        display: flex;
        justify-content: space-between;
        line-height: 16px;
        text-shadow: 0px 3px 4px rgba(9, 29, 32, 0.4);
        background: linear-gradient(180deg, #c5f0f5 0%, #3ae2f9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        .img {
            img {
                width: 24px;
                height: 24px;
                margin-right: 10px;
            }
        }
        .close {
            cursor: pointer;
            img {
                width: 12px;
                height: 12px;
            }
        }
    }
    .search {
        margin-top: 0.925vh;
        justify-content: space-between;
        /deep/ .el-input {
            width: 221px;
            // height: 28px;
        }
        // /deep/ .el-input__inner {
        //   width: 221px;
        //   background: #f2f2f2;
        //   border-radius: 2px 2px 2px 2px;
        //   opacity: 1;
        //   height: 28px;
        // }
        .creatFilter {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 90px;
            height: 28px;
            background: linear-gradient(180deg, #17bdd3 0%, #1c4348 100%);
            border-radius: 2px 2px 2px 2px;
            border-radius: 2px 2px 2px 2px;
            cursor: pointer;
            font-size: 12px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #ffffff;
        }
    }
    .viewPortFilter {
        margin-top: 0.925vh;
        justify-content: space-between;
        padding-bottom: 12px;
        /deep/ .el-input {
            width: 176px;
            height: 28px;
        }
        /deep/ .el-input__inner {
            width: 176px;
            // background: #f2f2f2;
            border-radius: 2px 2px 2px 2px;
            opacity: 1;
            height: 28px;
        }
    }
    .filterList {
        height: calc(100% - 40px);
        margin-top: 6px;
    }
}
// /deep/ .el-select-dropdown__item {
//   font-size: 14px;
//   font-family: Roboto-Regular, Roboto;
//   font-weight: 400;
//   color: red;
//   // line-height: 16px;
// }
// 模型视口列表
.blue {
    background: linear-gradient(180deg, #17bdd3 0%, #1c4348 100%) !important;
    color: white !important;
}
.viewPortList {
    height: 64.4vh;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    .viewPortItem {
        margin-bottom: 12px;
        padding: 14px 12px 12px 12px;
        // width: 359px;
        height: 336px;
        background: rgba(58, 226, 249, 0.1);
        border-radius: 2px 2px 2px 2px;
        border: 1px solid rgba(58, 226, 249, 0.4);

        .cardTop {
            justify-content: space-between;
            .cardTopLeft {
                img {
                    width: 32px;
                    height: 32px;
                }
                .info {
                    margin-left: 8px;
                    .creatName {
                        font-size: 16px;
                        font-family: Roboto, Roboto;
                        font-weight: 400;
                        color: #c5f0f5;
                    }
                    .creatTime {
                        font-size: 12px;
                        font-family: Roboto, Roboto;
                        font-weight: 400;
                        color: rgba(197, 240, 245, 0.4);
                        margin-top: 4px;
                    }
                }
            }
            .cardTopRight {
                .icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    font-size: 16px;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(180deg, rgba(23, 189, 211, 0.6) 0%, rgba(28, 67, 72, 0.6) 100%);
                    cursor: pointer;
                    margin-left: 12px;
                    color: rgba(255, 255, 255, 0.6);
                }
                .icon:hover {
                    background: linear-gradient(180deg, #17bdd3 0%, #1c4348 100%);
                    color: white;
                }
            }
        }
        .cardMain {
            .viewName {
                margin-top: 14px;
                .nameInfo {
                    max-width: 192px;
                    font-size: 16px;
                    font-family: Roboto, Roboto;
                    font-weight: 500;
                    color: #c5f0f5;
                }
                .status {
                    margin-left: 8px;
                    width: 44px;
                    height: 23px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-family: Roboto, Roboto;
                    font-weight: 400;
                }
                .normal {
                    background: rgba(74, 202, 156, 0.2);
                    border-radius: 2px 2px 2px 2px;
                    border: 1px solid #4aca9c;
                    color: rgba(74, 202, 156, 1);
                }
                .import {
                    background: rgba(250, 173, 6, 0.2);
                    border-radius: 2px 2px 2px 2px;
                    border: 1px solid #faad06;
                    color: #faad06;
                }
                .jinji {
                    background: rgba(221, 36, 36, 0.2);
                    color: #dd2424;
                }
            }
            .remark {
                margin-top: 2px;
                width: 100%;
                font-size: 14px;
                font-family: Roboto, Roboto;
                font-weight: 400;
                color: rgba(197, 240, 245, 0.6);
                height: 44px;
            }
            .viewImg {
                img {
                    width: 100%;
                    height: 188px;
                    border-radius: 2px 2px 2px 2px;
                }
            }
        }
    }
}
.el-select-dropdown {
    background: red !important;
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 1), rgba(23, 189, 211, 1), rgba(58, 226, 249, 1)) 1 1;
}
.el-dropdown-menu {
    background: rgba(9, 29, 32, 1);
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 1), rgba(23, 189, 211, 1), rgba(58, 226, 249, 1)) 1 1;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
    background: rgba(3, 119, 135, 0.2);
}
.el-select-dropdown__item.selected {
    color: #3ae2f9;
}
.el-select-dropdown__list {
    background: rgba(9, 29, 32, 1);
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 1), rgba(23, 189, 211, 1), rgba(58, 226, 249, 1)) 1 1;
}
/deep/ .el-checkbox__inner {
    width: 16px;
    height: 16px;
    background: rgba(28, 67, 72, 0.4);
    box-shadow: inset 0px 0px 4px 0px rgba(58, 226, 249, 0.6);
    border-radius: 2px 2px 2px 2px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
/deep/ .el-checkbox__inner::after {
    left: 40%;
    top: 20%;
    // transform: translate(-50%);
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: linear-gradient(180deg, rgba(197, 240, 245, 0.6) 0%, rgba(58, 226, 249, 0.3) 100%) rgba(28, 67, 72, 0.4);
    box-shadow: inset 0px 0px 4px 0px rgba(58, 226, 249, 0.6);
    border-color: transparent;
}

.el-tree-node:focus > .el-tree-node__content {
    background-color: transparent !important;
}
.sectionBox {
    width: 244px;
    height: 108px;
    background: #2d2d2e;
    border-radius: 2px 2px 2px 2px;
    position: fixed;
    left: 140px;
    top: 390px;
    padding: 12px 16px 16px 16px;
    .title {
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px solid #4a4a4c;
        .name {
            font-size: 16px;
            font-family: Roboto, Roboto;
            font-weight: bold;
            color: #ababab;
        }
        .close img {
            cursor: pointer;
            width: 17px;
            height: 17px;
        }
    }
    .buttonLis {
        justify-content: space-between;
        margin-top: 8px;
        .button {
            cursor: pointer;
            width: 70px;
            height: 44px;
            background: rgba(217, 217, 217, 0.02);
            border-radius: 0px 0px 0px 0px;
            img {
                width: 28px;
                height: 29px;
            }
        }
        .active {
            background: rgba(217, 217, 217, 0.06);
        }
    }
}
.fileModList {
    height: 50%;
    overflow-y: scroll;
    .title {
        font-size: 14px;
        color: #3ae2f9;
    }
}
/deep/ .el-select-dropdown {
    background: rgba(9, 29, 32, 1) !important;
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 1), rgba(23, 189, 211, 1), rgba(58, 226, 249, 1)) 1 1;
}
/deep/ .el-dropdown-menu {
    background: rgba(9, 29, 32, 1) !important;
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 1), rgba(23, 189, 211, 1), rgba(58, 226, 249, 1)) 1 1;
}
ul {
    background: rgba(9, 29, 32, 1) !important;
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 1), rgba(23, 189, 211, 1), rgba(58, 226, 249, 1)) 1 1;
}
/deep/ .el-button--text {
    color: rgba(197, 240, 245, 1);
}
/deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent !important;
}
.el-tree-node:focus > .el-tree-node__content {
    background-color: transparent !important;
}

.bmYulan {
    height: calc(100vh - 120px);
    #domId {
        height: calc(100vh - 120px);
    }
}
.listree .main /deep/ .el-tree {
    height: 27.8vh;
    overflow: scroll;
}
/deep/ .el-breadcrumb {
    background: #fff;
}

/deep/ .gld-bf-tree {
    display: none;
}
.el-select /deep/ .select-popper {
    z-index: 8888 !important;
    top: auto !important;
    left: auto !important;
}
.formItem {
    display: flex;
    align-items: center;
    margin-top: 10px;
    /deep/ .el-input__inner {
        width: 175px;
        height: 44px;
        background: #f2f2f2;
        border-radius: 2px 2px 2px 2px;
    }
}
.btns {
    margin-top: 15px;
    text-align: right;
}
.conent {
    margin: 10px !important;

    padding-right: 0px;
}
.filter {
    position: absolute;
    z-index: 999;
    width: 48px;
    height: 48px;
    // background: #ffffff;
    border-radius: 1px 1px 1px 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 136px;
    left: 10px;
    cursor: pointer;
    img {
        width: 48px;
        height: 48px;
    }
}
.menuTree {
    top: 16px;
}
.viewPort {
    top: 78px;
}
.rightFilter /deep/ .el-input__inner {
    width: 228px;
    height: 3.3vh;
    line-height: 48px;
    background: rgba(28, 67, 72, 0.4);
    box-shadow: inset 0px 0px 4px 0px rgba(58, 226, 249, 0.6);
    // box-shadow: inset 0px 0px 4px 0px rgba(58, 226, 249, 0.6);
    border-radius: 2px 2px 2px 2px;
    border: none;
    color: #c5f0f5;
}

/deep/ .el-dialog {
    // margin-left: 420px;
    background: rgba(9, 29, 32, 0.8);
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1;
    .fileModItem {
        display: flex;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #c5f0f5;
        line-height: 22px;
        // cursor: pointer;
        border: 1px solid transparent;
        .ind {
            width: 24px;
        }
        .name {
            margin-left: 10px;
            width: 307px;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .time {
            margin-left: 10px;
        }
        .caozuo {
            margin-left: 10px;
            a {
                color: #c5f0f5;
                text-decoration: none;
            }
            .dw {
                margin-right: 5px;
            }
            .dw,
            .yl {
                cursor: pointer;
            }
        }
    }
    .fileModItem:hover {
        background: rgba(58, 226, 249, 0.1);
        border-radius: 2px 2px 2px 2px;
        opacity: 1;
        border: 1px solid #3ae2f9;
        color: #3ae2f9 !important;
    }
    .fileModItem:hover a {
        color: #3ae2f9 !important;
    }
}
/deep/ .el-dialog__body {
    height: 500px;
    overflow: scroll;
}
/deep/ .el-dialog__body::-webkit-scrollbar {
    display: none;
}
.listree {
    position: absolute;
    min-width: 330px;
    height: 40.4vh;
    background: rgba(9, 29, 32, 0.8);
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1;
    z-index: 999999;
    left: 58px;
    top: 12px;
    color: rgba(197, 240, 245, 1);
    .custom-tree-node {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        .label {
            width: 300px;
        }
        .icon-wenjian {
            font-size: 14px;
            padding: 0;
            margin: 0;
            height: 14px;
            line-height: 14px;
            // color: rgba(197, 240, 245, 1) !important;
            font-family: "font_family" !important;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }
    /deep/ .el-tree {
        height: 380px;
        padding: 10px;
        overflow: scroll;
        background: transparent;
        color: #c5f0f5;
    }
    /deep/ .el-tree-node.is-current > .el-tree-node__content {
        background: rgba(3, 119, 135, 0.2);
    }

    /deep/ .el-tree-node__content:hover {
        background: rgba(3, 119, 135, 0.2);
    }
    /deep/ .is-current {
        color: #3ae2f9;
        background: rgba(3, 119, 135, 0.2) !important;
        button {
            span {
                color: #3ae2f9;
            }
        }
    }
    /deep/ .el-tree::-webkit-scrollbar {
        display: none;
    }

    .top {
        display: flex;
        align-items: center;
        padding: 24px 20px 0px;
        justify-content: space-between;
        .title {
            font-size: 16px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: rgba(197, 240, 245, 1);
        }
        img {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
    .tab {
        padding: 0px 20px 0px;
        margin-top: 24px;
        display: flex;
        .tabItem {
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: rgba(197, 240, 245, 1);
            height: 32px;
            cursor: pointer;
        }
        .active {
            color: rgba(23, 189, 211, 1);
            position: relative;
        }
        .active::after {
            content: "";
            position: absolute;
            width: 25%;
            height: 2px;
            background-color: rgba(23, 189, 211, 1);
            bottom: -12px;
        }
    }
    .main {
        margin-top: 12px;
    }
}
/deep/ .bf-loading .bf-loading-gif {
    background-image: url("https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/bim/logo.gif");
}
// 右键菜单样式
/deep/ .bf-menu-right,
/deep/ .bf-menu {
    background: rgba(9, 29, 32, 0.8) !important;
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid !important;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1 !important;
}
/deep/ .bf-routes-create,
/deep/ .bf-route-add {
    border-color: rgba(23, 189, 211, 0.2) !important;
    color: #3ae2f9 !important;
}
/deep/ .bf-routes-return,
/deep/ .bf-route-clear {
    color: #3ae2f9 !important;
}
/deep/ .bf-routes-return,
/deep/ .bf-route-name,
/deep/ .bf-route-button {
    color: #3ae2f9 !important;
}
/deep/ .bf-route-control {
    background: rgba(9, 29, 32, 0.8) !important;
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1;
}
/deep/ .bf-menu .bf-menu-item {
    color: #c5f0f5;
}
// /deep/ .bf-route-info-input:focus{
//   border-color: rgba(23, 189, 211, 1) !important;
// }
/deep/ .bf-route-info-row .bf-route-info-input {
    border-color: rgba(23, 189, 211, 0.5) !important;
}
/deep/ .bf-map-panel {
    width: 400px !important;
}
/deep/ .bf-select-option {
    color: #c5f0f5;
}
/deep/ .bf-select-option:hover {
    background: rgba(3, 119, 135, 0.2) !important;
}
/deep/.bf-menu .bf-menu-item:hover {
    color: #c5f0f5;
    background: rgba(3, 119, 135, 0.2);
}
// 构件详情
/deep/ .bf-panel {
    background: rgba(9, 29, 32, 0.8);
    box-shadow: inset 0px 0px 9px 0px #17bdd3;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1;
    color: rgba(197, 240, 245, 1);
}
/deep/ .bf-panel-title-wrap,
/deep/ .bf-title,
/deep/ .bf-group-title {
    background: transparent !important;
}
/deep/ .bf-panel .bf-table .bf-group-title td {
    background: rgba(23, 189, 211, 0.2);
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #c5f0f5;
}
/deep/ .bf-panel .bf-table .bf-key {
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #17bdd3;
}
/deep/ .bf-scroll-bar::-webkit-scrollbar {
    background: transparent;
}
/deep/ .bf-scroll-bar::-webkit-scrollbar-thumb {
    background: rgba(23, 189, 211, 0.2);
    border-radius: 3px 3px 3px 3px;
    width: 6px;
}
/deep/ .bf-panel .bf-table .bf-value {
    color: rgba(197, 240, 245, 1);
}
/deep/ .bf-panel .bf-panel-tips {
    color: rgba(197, 240, 245, 1);
}
/deep/ .bf-panel .bf-table tr:hover {
    background: rgba(3, 119, 135, 0.2);
}
/deep/ .bf-property-tab .bf-tabs-list {
    border-bottom: 1px solid rgba(23, 189, 211, 0.2);
}
/deep/ .bf-property-tab .bf-tabs-list .bf-tabs-option {
    width: 30%;
    border-bottom: transparent;
}
/deep/ .bf-property-tab .bf-tabs-list .bf-tabs-option.active {
    border-bottom: 3px solid #17bdd3;
    color: #17bdd3;
}
//底部菜单栏

// /deep/ .gld-bf-firstperson,
/deep/ .gld-bf-settings {
    display: none;
}
/deep/ .bf-toolbar,
/deep/ .bf-toolbar-button .bf-sub-toolbar {
    background: rgba(28, 67, 72, 0.9);
    box-shadow: inset 0px 0px 20px 0px rgba(23, 189, 211, 0.5);
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid;
    border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1;
}
/deep/ .gld-bf-section-plane-pick,
/deep/ .gld-bf-section-axial,
/deep/ .gld-bf-sectionbox1 {
    display: inline-block !important;
}
/deep/ .bf-button {
    color: rgba(197, 240, 245, 1) !important;
    font-family: "font_family" !important;
    font-size: 32px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
/deep/ .gld-bf-home:before {
    content: "\e601";
}
/deep/ .gld-bf-zoomrect:before {
    content: "\e608";
}
// 测量
/deep/ .gld-bf-measure:before {
    content: "\e604";
}
/deep/ .gld-bf-sectionboxZjw:before {
    content: "\e606";
}
// 剖切
/deep/ .gld-bf-sectionbox {
    display: none;
}
/deep/ .gld-bf-map:before {
    content: "\e609";
}
/deep/ .gld-bf-section-plane-pick:before {
    content: "\e607";
}
/deep/ .gld-bf-section-axial:before {
    content: "\e60a";
}
/deep/ .gld-bf-sectionbox1:before {
    content: "\e60b";
}
// 构件详情
/deep/ .gld-bf-properties:before {
    content: "\e602";
}
// 基本信息
/deep/ .gld-bf-information:before {
    content: "\e600";
}
// 全屏幕
/deep/ .gld-bf-maximize:before,
/deep/ .gld-bf-minimize:before {
    content: "\e603";
}
/deep/ .gld-bf-route:before {
    content: "\e60e";
}
/deep/ .gld-bf-third-person-lg:before {
    content: "\e60f";
}
/deep/ .bf-modelTree-panel:before {
    display: block;
}
/deep/ .bf-info-power {
    display: none;
}
/deep/ .bf-button.bf-checked {
    background: transparent;
    border-color: #17bdd3;
}
/deep/ .bf-info-list-more li {
    color: #c5f0f5 !important;
}
/deep/ .gld-bf-firstperson:before {
    content: "\e60c";
}
.rightFilter /deep/ .el-dialog__title {
    font-size: 14px;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
    line-height: 16px;
    text-shadow: 0px 3px 4px rgba(9, 29, 32, 0.4);
    background: linear-gradient(180deg, #c5f0f5 0%, #3ae2f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
/deep/ .bf-loading-progress {
    color: white;
}
/deep/ .bf-map-big-panel {
    width: 630px !important;
}
/deep/ .bf-walk-exit {
    background: transparent !important;
}
/deep/ .bf-map-isolate,
/deep/ .bf-map-section {
    color: #c5f0f5;
    background: rgba(3, 119, 135, 0.2) !important;
    cursor: pointer;
}
/deep/ .bf-menu .bf-menu-item {
    color: #c5f0f5 !important;
}

/deep/ .el-image-viewer__canvas {
    width: 80%;
    height: 70%;
    margin: 50px auto;
}
</style>
