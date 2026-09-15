let teams = [
    {
        id: 1,
        tname: "Rusty",
        tl: "Arpit Agnihotri",
        email: "arpit151604@gmail.com",
        members: 6
    },
    {
        id: 2,
        tname: "Acube",
        tl: "Archit Shrivastava",
        email: "archit314@gmail.com",
        members: 3
    }
];

let nextId = 3;

export const getAllTeams = () => teams;

export const getTeamById = (id) =>
    teams.find((team) => team.id === id);

export const addTeam = (newTeam) => {
    const team = {
        id: nextId++,
        ...newTeam
    };

    teams.push(team);
    return team;
};

export const updateTeam = (id, updatedTeam) => {
    const team = getTeamById(id);

    if (!team) return null;

    Object.assign(team, updatedTeam);
    return team;
};

export const deleteTeam = (id) => {
    const index = teams.findIndex((team) => team.id === id);

    if (index === -1) return false;

    teams.splice(index, 1);
    return true;
};