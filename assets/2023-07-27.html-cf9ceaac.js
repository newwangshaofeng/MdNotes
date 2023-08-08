import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as r,c as d,e,f as n,b as s,d as t}from"./app-485d09e2.js";const o="/assets/image-20230727101303304-9c571991.png",c="/assets/image-20230727101433211-43f3b5cb.png",u={},v=t(`<h1 id="_2023-07-27" tabindex="-1"><a class="header-anchor" href="#_2023-07-27" aria-hidden="true">#</a> 2023-07-27</h1><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 针对文件存储优化.临时文件和文件采用一个mongo库,根据不同bucketname区分</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 11401 <strong>门户系统-数据目录无法根据相应地市显示对应数据</strong></label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> 20165 <strong>【优化—数据备份】功能触发位置调整</strong></label></li></ul><h2 id="发布m3d临时服务到gms" tabindex="-1"><a class="header-anchor" href="#发布m3d临时服务到gms" aria-hidden="true">#</a> 发布m3d临时服务到gms</h2><p>MapGIS.GM.BaseService.dll 新增一组发布m3d临时服务接口</p><p>IMapGISServicePublishService 新增PublishTempM3D2Server 用于发布m3d临时服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
        ActionResult&lt;WebPublishServiceInfoDto&gt; PublishTempM3D2Server(GMDomainServiceLayerTypeAttribute serviceLayerTypeAttribute,
            string serverName, string mcjFilePath);


        ActionResult&lt;WebPublishServiceInfoDto&gt; PublishTempM3D2Server&lt;T&gt;(string serviceLayerTypeId, string serverName, string mcjFilePath, T attachInfo) where T : class;


        ActionResult&lt;WebPublishServiceInfoDto&gt; PublishTempM3D2Server&lt;T&gt;(GMDomainServiceLayerTypeAttribute serviceLayerTypeAttribute,
            string serverName, string mcjFilePath, T attachInfo) where T : class;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    var svc = DataWorksRuntime.Instance.GetService&lt;IMapGISServicePublishService&gt;();
    svc.PublishTempM3D2Server&lt;object&gt;(GMServiceLayerTypeDefine.IgsGmM3dPipeLayer, serviceName, mcjPath, null);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建mongo用户</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use shanghai_ceshi

db.createUser(
    {
        user:&quot;admin&quot;,
        pwd:&quot;admin@123&quot;,
        roles:[
            {role:&quot;dbOwner&quot;, db:&quot;shanghai_ceshi&quot;}
        ]
    }
)


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>收获:</p><p>mongo的备份还原:</p>`,12),m={href:"https://gitee.com/fengqixi_358/mongo-dbmanager/tree/master",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"pgsql的备份还原:",-1),g=e("p",null,"notion笔记备份库:",-1),p={href:"https://gitee.com/haipihuang/notion_backup_helper_tool?_from=gitee_search",target:"_blank",rel:"noopener noreferrer"},h=t(`<p>清理mongo文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>csharp
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
 public class GridFSCleanup
{
    private const string ConnectionString = &quot;mongodb://localhost:27017&quot;;
    private const string DatabaseName = &quot;your_database_name&quot;;
    private const string FilesCollectionName = &quot;fs.files&quot;;
    private const string ChunksCollectionName = &quot;fs.chunks&quot;;
    private const string PrefixToRemove = &quot;B93172e25f5e9498287cc08828947b253&quot;;
     public void CleanupFiles()
    {
        var client = new MongoClient(ConnectionString);
        var database = client.GetDatabase(DatabaseName);
        var filesCollection = database.GetCollection&lt;BsonDocument&gt;(FilesCollectionName);
        var chunksCollection = database.GetCollection&lt;BsonDocument&gt;(ChunksCollectionName);
         var filter = Builders&lt;BsonDocument&gt;.Filter.Regex(&quot;filename&quot;, new BsonRegularExpression($&quot;^{PrefixToRemove}&quot;));
        var filesToDelete = filesCollection.Find(filter).ToList();
         foreach (var file in filesToDelete)
        {
            var fileId = file[&quot;_id&quot;].AsObjectId;
            chunksCollection.DeleteMany(Builders&lt;BsonDocument&gt;.Filter.Eq(&quot;files_id&quot;, fileId));
            filesCollection.DeleteOne(Builders&lt;BsonDocument&gt;.Filter.Eq(&quot;_id&quot;, fileId));
        }
         Console.WriteLine($&quot;Deleted {filesToDelete.Count} files.&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tip1" tabindex="-1"><a class="header-anchor" href="#tip1" aria-hidden="true">#</a> Tip1</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>

   UserInfo userInfo = securityUtil.getCurUserInfo();
        if (userInfo!=null){
            System.out.printf(&quot;方式1获取用户:&quot;+userInfo.getUsername() +&quot;,&quot;+userInfo.getUnit()+&quot;当前city:&quot;+userInfo.getCityName()+&quot;\\r\\n&quot;);
        }

        if (param.getDistrict() != null) {
            condition.append(String.format(&quot;%s=\\&quot;%s\\&quot;&quot;, CommonFunc.OwnerFieldString, param.getDistrict().getCityName()));
        }

        if (userInfo != null &amp;&amp; userInfo.getCityName() != null &amp;&amp; !userInfo.getCityName().equals(&quot;广东省&quot;)) {
            if (condition.length() &gt; 0) {
                condition.append(String.format(&quot;and ( %s=&#39;%s&#39; ) &quot;, CommonFunc.OwnerFieldString, userInfo.getCityName()));
            }else{
                condition.append(String.format(&quot;%s=\\&quot;%s\\&quot;&quot;, CommonFunc.OwnerFieldString, userInfo.getCityName()));
            }
        }

        System.out.printf(&quot;当前过滤条件:&quot;+condition.toString()+&quot;\\r\\n&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tip2" tabindex="-1"><a class="header-anchor" href="#tip2" aria-hidden="true">#</a> TIP2</h2><p>针对文件存储做了调整,文件和临时文件均放置一个库.之前放2个库</p><figure><img src="`+o+'" alt="image-20230727101303304" tabindex="0" loading="lazy"><figcaption>image-20230727101303304</figcaption></figure><figure><img src="'+c+'" alt="image-20230727101433211" tabindex="0" loading="lazy"><figcaption>image-20230727101433211</figcaption></figure>',8);function f(q,_){const i=a("ExternalLinkIcon");return r(),d("div",null,[v,e("p",null,[e("a",m,[n("https://gitee.com/fengqixi_358/mongo-dbmanager/tree/master"),s(i)])]),b,g,e("p",null,[e("a",p,[n("https://gitee.com/haipihuang/notion_backup_helper_tool?_from=gitee_search"),s(i)])]),h])}const S=l(u,[["render",f],["__file","2023-07-27.html.vue"]]);export{S as default};
