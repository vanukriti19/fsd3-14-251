import http from "http";
import { getAllTeams, addTeam, getTeamBy}


const server = http.createServer(async (req, res))