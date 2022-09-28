(()=>{var n=class{constructor(t,e,r){this.mgr=t,this.pool_name=e,this.name=r}static async list(t,e,r){return r=r===void 0?!1:r,await(await fetch(`${t.url}/api/v1/pools/${e}/volumes?state=${r?1:0}`,{headers:{...t.authHeaders()}})).json()}async get(t){return t=t===void 0?!1:t,await(await fetch(`${this.mgr.url}/api/v1/pools/${this.pool_name}/volumes/${this.name}?state=${t?1:0}`,{headers:{...this.mgr.authHeaders()}})).json()}async startOrStop(t){return await(await fetch(`${this.mgr.url}/api/v1/pools/${this.pool_name}/volumes/${this.name}/${t}`,{method:"POST",headers:{...this.mgr.authHeaders()}})).json()}async start(){return await this.startOrStop("start")}async stop(){return await this.startOrStop("stop")}async delete(){let t=await fetch(`${this.mgr.url}/api/v1/pools/${this.pool_name}/volumes/${this.name}`,{method:"DELETE",headers:{...this.mgr.authHeaders()}});if(t.status!=204)throw new Error((await t.json()).error)}};var i=class{constructor(t,e){this.mgr=t,this.name=e}static async create(t,e){let s=await(await fetch(`${t.url}/api/v1/pools`,{method:"POST",headers:{...t.authHeaders(),"Content-Type":"application/json"},body:JSON.stringify({name:e})})).json();if(s.error)throw new Error(s.error);return s}static async list(t){return await(await fetch(t.url+"/api/v1/pools",{headers:{...t.authHeaders()}})).json()}async listVolumes(t){return await n.list(this.mgr,this.name,t)}async delete(){let t=await fetch(`${this.mgr.url}/api/v1/pools/${this.name}`,{method:"DELETE",headers:{...this.mgr.authHeaders()}});if(t.status!=204)throw new Error((await t.json()).error)}volume(t){return new n(this.mgr,this.name,t)}};var o=class{constructor(t){this.url=t,this.user_id="",this.api_key_id="",this.token=""}static fromToken(t,e,r,s){let a=new o(t);return a.user_id=e,a.api_key_id=r,a.token=s,a}authHeaders(){return this.token!=""?{Authorization:`Bearer ${this.token}`,"X-User-ID":this.user_id}:{}}async generateApiKey(t,e){var r=await fetch(`${this.url}/api/v1/users/${t}/api-keys`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})});let s=await r.json();if(s.error)throw new Error(s.error);return s}static async login(t,e,r){let s=new o(t),a=await s.generateApiKey(e,r);return s.user_id=a.user_id,s.api_key_id=a.id,s.token=a.token,s}async logout(){if(this.api_key_id=="")return;let t=await fetch(`${this.url}/api/v1/api-keys/${this.api_key_id}`,{method:"DELETE",headers:{...this.authHeaders()}});if(t.status!=204)throw new Error((await t.json()).error);this.api_key_id="",this.user_id="",this.token=""}async listPools(){return await i.list(mgr)}pool(t){return new i(this,t)}async createPool(t){return await i.create(this.mgr,t)}};window.StorageManager=o;})();