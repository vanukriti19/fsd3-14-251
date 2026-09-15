import http from "http";
import * as teams from "./teams.js";
import { parse as parseUrl } from "url";

const PORT = 5000;

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(data === undefined ? "" : JSON.stringify(data));
};

const parseJSONBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
    });
};

const server = http.createServer(async (req, res) => {
    const { pathname, query } = parseUrl(req.url, true);
    const { method } = req;

    console.log("pathname:", pathname);
    console.log("query:", query);
    console.log("Method:", method);
    if (pathname === "/api/v1/teams" && method === "GET") {
        const allTeams = teams.getAllTeams();

        return sendJson(res, 200, allTeams);
    }
    else if (pathname === "/api/v1/teams" && method === "POST") {
        try {
            const newTeam = await parseJSONBody(req);

            const team = teams.addTeam(newTeam);

            return sendJson(res, 201, team);
        } catch (error) {
            return sendJson(res, 400, {
                error: "Invalid JSON"
            });
        }
    }
    else if (pathname.startsWith("/api/v1/teams/") && method === "GET") {
        const id = Number(pathname.split("/").pop());

        const team = teams.getTeamById(id);

        if (!team) {
            return sendJson(res, 404, {
                error: "Team not found"
            });
        }

        return sendJson(res, 200, team);
    }
    else if (pathname.startsWith("/api/v1/teams/") && method === "PUT") {
        try {
            const id = Number(pathname.split("/").pop());

            const updatedTeam = await parseJSONBody(req);

            const team = teams.updateTeam(id, updatedTeam);

            if (!team) {
                return sendJson(res, 404, {
                    error: "Team not found"
                });
            }

            return sendJson(res, 200, team);
        } catch (error) {
            return sendJson(res, 400, {
                error: "Invalid JSON"
            });
        }
    }
    else if (pathname.startsWith("/api/v1/teams/") && method === "DELETE") {
        const id = Number(pathname.split("/").pop());

        const deleted = teams.deleteTeam(id);

        if (!deleted) {
            return sendJson(res, 404, {
                error: "Team not found"
            });
        }

        return sendJson(res, 200, {
            message: "Team deleted successfully"
        });
    }

    // Invalid route
    else {
        return sendJson(res, 404, {
            error: "Route not found"
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});