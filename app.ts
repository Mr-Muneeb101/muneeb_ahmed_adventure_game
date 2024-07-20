#! /usr/bin/env node
import inquirer from "inquirer";
// Player class
class player {
    name: string;
    health: number = 100;
    constructor(name: string) {
        this.name = name;
    }
    decrease_health() {
        let newhealth = this.health - 25;
        this.health = newhealth;
    }
    drink_portion() {
        this.health = 100;
    }
}
class opponent extends player {
}

async function mian() {
    let user_options = await inquirer.prompt([
        {
            name: "P_name",
            type: "input",
            message: "please enter the name of player",
            validate: (name) => {
                if (name) {
                    return true;
                } else {
                    return `Enter player name name`;
                }
            }
        }, {
            name: "O_name",
            type: "list",
            message: "please enter the name of player",
            choices: ["skeleton", "assasin", "zombie"]
        }
    ]);
    console.log(`\n\t\t ${user_options.P_name}   VS   ${user_options.O_name} \t\t\n`);
    const Player = new player(user_options.P_name);
    const enemy = new opponent(user_options.O_name);
    do {
        let user_actions = await inquirer.prompt([
            {
                name: "actions",
                type: "list",
                message: "Select your actions from below",
                choices: ["Attack", "Drink portion", "run"],
            }
        ]);
        switch (user_actions.actions) {
            case "Attack":
                let randomNumber = Math.floor(Math.random() * 2);
                if (randomNumber > 0) {
                    Player.decrease_health();
                    console.log(`${player.name} have damaged: \n\t player health is ${Player.health}`);
                    if (Player.health <= 0) {
                        console.log(`${player.name}: You lose please try next time`);
                        return false;
                    }
                } else if (randomNumber <= 0) {
                    enemy.decrease_health();
                    console.log(`${enemy.name} have damaged: \n\t Enemys health is ${enemy.health}`);
                    if (enemy.health >= 0) {

                    }
                }
                break;

            case "Drink portion":
                Player.drink_portion();
                console.log(`${player.name} health increased \n\t Player health is ${enemy.health}`);
                break;
            case "run":
                console.log(`${player.name}: You lose please try next time`);
                return false;
                break;

            default:
                break;
        }

    } while (true);
}

mian();