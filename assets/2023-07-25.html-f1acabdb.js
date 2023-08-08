import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as l,d as s}from"./app-cd00334c.js";const a={},n=s(`<h1 id="_2023-07-25" tabindex="-1"><a class="header-anchor" href="#_2023-07-25" aria-hidden="true">#</a> 2023-07-25</h1><p><mark>Task</mark></p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 服务发布mongo取登录配置信息</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> java sdk代码生成-100%</label></li></ul><p><mark>bug</mark></p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> 11393 <strong>【数据库升级工具】导入标准地层描述表报错</strong></label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-3" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-3"> 10186 <strong>【元数据导出】自定义字段导出后在excel中字段名显示不正确</strong></label></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>

 private void InitExcelHeaderFieldMap(string prjId)
        {
            var dss = DataWorksRuntime.Instance.GetService&lt;Igmsys_metadata_schemaService&gt;();

            var datas=dss.QueryAll(t =&gt; t.prj_id == prjId);

            if (datas!=null &amp;&amp; datas.Any())
            {
                foreach (var item in datas)
                {
                    if (!_excelHeaderFieldMap.Value.ContainsKey(item.id))
                    {
                        _excelHeaderFieldMap.Value.Add(item.id,item.m_name);
                    }
                }
                
            }

        }
        
        
          InitExcelHeaderFieldMap(prjId);
          
             cell0.SetCellValue(_excelHeaderFieldMap.Value.ContainsKey(columnInfo.Key)
                            ? _excelHeaderFieldMap.Value[columnInfo.Key]
                            : columnInfo.Key);
                            
                            
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),d=[n];function t(c,r){return i(),l("div",null,d)}const b=e(a,[["render",t],["__file","2023-07-25.html.vue"]]);export{b as default};
