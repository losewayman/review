class Graph{
    constructor(){
        this.vertis = []; // 图的顶点列表
        this.adjList = new Map(); // 邻接表
        this.adjArr = [ // 邻接矩阵 有向图
            [0,2,4,0,0,0],
            [0,0,2,4,2,0],
            [0,0,0,0,3,0],
            [0,0,0,0,0,2],
            [0,0,0,3,0,2],
            [0,0,0,0,0,0]
        ];
    }
    addVer(v){ // 添加顶点
        if(!this.vertis.includes(v)){
            this.vertis.push(v);
            this.adjList.set(v,[]);
        }
    }
    addEdge(v,w){ //添加边,先判断边的两个顶点是否存在
        if(!this.vertis.includes(v)){
            this.addVer(v)
        }
        if(!this.vertis.includes(w)){
            this.addVer(w)
        }
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }
    getVer(){
        return this.vertis;
    }
    getAdjList(){
        return this.adjList;
    }
    bfs(v){ // 队列，遍历队头节点邻接表入队，下一次循环队头出队，重复操作
        let quene = [v];
        let ha = {};
        let res = [];
        for(let j=0;j<this.vertis.length;j++){ // 添加状态表
            ha[this.vertis[j]] = 0;
        }
        ha[v]=1;
        while(quene.length){
            let node = quene.shift();
            res.push(node)
            let list = this.adjList.get(node);
            for(let i=0;i<list.length;i++){ // 遍历当前节点邻接表
                if(ha[list[i]]===0){ // 如果这个节点还没访问过
                    quene.push(list[i]);
                    ha[list[i]] = 1; // 添加到队列以后要把状态改了
                }
            }
        }
        return res;
    }
    dfs(){ //深度优先搜索，栈的思想
        let res = [];
        let ha = {};
        for(let j=0;j<this.vertis.length;j++){ // 添加状态表
            ha[this.vertis[j]] = 0;
        }
        let count = 1;
        const ff = (nod) => { // 遍历邻接表，第一项一层层进入，没有以后回头第二项，第一项的所有遍历完以后再进入第二项
            //console.log(nod,count++)
            let node = nod;
            res.push(node);
            ha[node] = 1;
            let list = this.adjList.get(node);
            for(let i = 0;i<list.length;i++){
                if(ha[list[i]]===0){
                    ff(list[i]);
                }
            }
            //console.log(nod,count++)
        }
        for(let j=0;j<this.vertis.length;j++){ // 遍历顶点
            if(ha[this.vertis[j]]===0) // 没访问过就去遍历
            ff(this.vertis[j]);
        }
        return res;
    }
    dijkstra(graph,src){
        const INF = Number.MAX_SAFE_INTEGER;
        const dist = []; //与各顶点的距离
        const visited = []; //走过
        let length = graph.length;
        for(let i=0;i<length;i++){
            dist[i] = INF;
            visited[i] = false;
        }
        const minDistance = () => {
            let min = INF;
            let minIndex = -1;
            for(let v = 0;v<dist.length;v++){
                if(visited[v]===false && dist[v]<=min){ // 没走过的节点的最小权值
                    min = dist[v];
                    minIndex = v;
                }
            }
            return minIndex;
        }
        dist[src] = 0;
        for(let i= 0;i<length-1;i++){
            let u = minDistance(); // 没走过的节点的最小权值的点
            console.log(u)
            visited[u] = true; // 将最小权值点标记为已走
            for(let v = 0;v<length;v++){ // 
                // 没访问过的       相连的                              前节点+权值比当前节点权值小
                if(!visited[v] && graph[u][v]!==0 && dist[u]!==INF && dist[u]+graph[u][v]<dist[v]){ 
                    dist[v] = dist[u]+graph[u][v]
                }
            }
        }
        return dist
    }
}
let gra = new Graph();
gra.addEdge("A","B");
gra.addEdge("A","C");
gra.addEdge("B","D");
gra.addEdge("D","E");
gra.addEdge("C","D");
gra.addEdge("C","F");
console.log("顶点列表：",gra.getVer());
console.log("邻接表：",gra.getAdjList());
console.log("广度优先搜索：",gra.bfs('A'));
console.log("深度优先搜索：",gra.dfs());
console.log("最短路径：",gra.dijkstra(gra.adjArr,0));