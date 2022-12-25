import express from "express"
import http from "http"
import socketIo from "socket.io"

export class Core {
    port!: number
    constructor(port: number) {
        this.port = port
    }
    run(): void {
        const ex = express()
        const httpServer = new http.Server(ex)
        const socketServer = new socketIo.Server(httpServer, {
            cors: {
                origin: "*"
            }
        })
        httpServer.listen(this.port, () => {
            console.log("服务器启动了！监听端口是:" + this.port)
        })


        socketServer.on("connection", (socket) => {
            console.log(`
有客户端链接:${socket.id}
当前在线人数:${socketServer.engine.clientsCount}
            `)
            //监听
            socket.on("message", (msg) => {
                console.log("广播客户端=>" + socket.id + "say:" + msg)
                socket.broadcast.emit("message", msg)
            })

            //掉线
            socket.on("disconnect", (reason) => {
                console.log(`
#####START#####
客户端:${socket.id}断开了链接
当前在线人数:${socketServer.engine.clientsCount}
原因是${reason}
#####END#####
                `)
            })
        })

        //http
        ex.get("/", (_, res) => {
            res.send("hello world")
        })
        ex.get("/test", (_, res) => {
            res.send("hello world test")
        })
    }
}
