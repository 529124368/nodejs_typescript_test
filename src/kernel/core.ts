import express, { Application, Request, Response } from "express"

export class Core {
    port: number | undefined
    instance: Application | undefined
    constructor(port: number) {
        this.port = port
    }
    run(): void {
        this.instance = express()
        this.instance.get("/", (req: Request, res: Response) => {
            console.log(req.ip)
            res.send("吨吨 你今天发骚38度是不是")
        });
        this.instance.get("/a", (req: Request, res: Response) => {
            res.send("a hello world")
        });
        this.instance.get("/b", (req: Request, res: Response) => {
            res.send("b hello world")
        });
        this.instance.listen(this.port, () => {
            console.log("服务器启动了")
        })
    }
}
