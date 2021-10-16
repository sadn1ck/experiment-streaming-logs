import { spawn } from "child_process";

export function reader(socket, { command, args }) {
  const proc = spawn(command, args);
  // exit
  proc.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  // output sth
  proc.stdout.on("data", (data) => {
    const str = data.toString();
    socket.send(
      JSON.stringify({
        event: "log",
        log: str,
      })
    );
  });
}
