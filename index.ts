import { EOL } from 'os';
import { red, blue, green, yellow, bold } from 'colorette';

export type SeatConfig = Array<[number, number]>;
export type SeatType = 'W' | 'A' | 'M';
export type SeatMap = {
    [key: string]: SeatType,
};
export type SeatPriority = Array<SeatType>;
export type SeatAssignmentMap = {
    [key: string]: {
        seatType: SeatType,
        passengerNumber: number,
    },
};

const SEAT_COLOR_MAP = {
    'W': green,
    'A': blue,
    'M': red,
};
const LEGEND = [
    `${green('■')} Window`,
    `${red('■')} Middle`,
    `${blue('■')} Aisle`,
    `${yellow('■')} Empty`,
];

export function buildSeatMapping(seatConfig: SeatConfig): SeatMap {
    let seats: SeatMap = {};
    const rows = seatConfig.map(_ => _[1]);
    for (let rowIndex = 0, rowLength = rows.length; rowIndex < rowLength; rowIndex++) {
        for (let colIndex = 0, length = seatConfig.length; colIndex < length; colIndex++) {
            if (rowIndex < seatConfig[colIndex][1]) {
                const columnSeatMap = seatConfig[colIndex];
                const columns = columnSeatMap[0];
                for (let innerColIndex = 0, colLength = columns; innerColIndex < colLength; innerColIndex++) {
                    let seatType: SeatType;
                    if (colIndex === 0) {
                        // Left edge.
                        if (innerColIndex === 0) {
                            seatType = 'W';
                        } else if (innerColIndex === colLength - 1) {
                            seatType = 'A';
                        } else {
                            seatType = 'M';
                        }
                    } else if (colIndex === length - 1) {
                        // Right edge.
                        if (innerColIndex === 0) {
                            seatType = 'A';
                        } else if (innerColIndex === colLength - 1) {
                            seatType = 'W';
                        } else {
                            seatType = 'M';
                        }
                    } else {
                        // Middle.
                        if (innerColIndex === 0 || innerColIndex === colLength - 1) {
                            seatType = 'A';
                        } else {
                            seatType = 'M';
                        }
                    }
                    seats[`${colIndex}_${innerColIndex}_${rowIndex}`] = seatType;
                }
            }
        }
    }
    return seats;
}

export function filterSeats(seatMap: SeatMap, seatType: SeatType) {
    return Object.entries(seatMap).filter(_ => _[1] === seatType);
}

export function assignSeats(seatMap: SeatMap, passengerCount: number, priority: SeatPriority = ['A', 'W', 'M']): SeatAssignmentMap {
    const assignmentMap: SeatAssignmentMap = {};
    let order: Array<[string, string]> = [];
    priority.forEach(priority => {
        order = order.concat(filterSeats(seatMap, priority));
    });
    order.slice(0, passengerCount).forEach((item, index) => {
        assignmentMap[item[0]] = {
            seatType: seatMap[item[0]],
            passengerNumber: index,
        }
    });
    return assignmentMap;
}

export function printSeatAssignments(seatConfig: SeatConfig, assignmentMap: SeatAssignmentMap) {
    console.log(`${EOL}🡑 Cockpit This Way 🡑${EOL}`);
    const rows = seatConfig.map(_ => _[1]);
    for (let rowIndex = 0, rowLength = rows.length; rowIndex < rowLength; rowIndex++) {
        let row = [];
        for (let colIndex = 0, length = seatConfig.length; colIndex < length; colIndex++) {
            const columnSeatMap = seatConfig[colIndex];
            const columns = columnSeatMap[0];
            if (rowIndex < seatConfig[colIndex][1]) {
                for (let innerColIndex = 0, colLength = columns; innerColIndex < colLength; innerColIndex++) {
                    const seatKey = `${colIndex}_${innerColIndex}_${rowIndex}`;
                    const seat = assignmentMap[seatKey];
                    if (seat) {
                        row.push(SEAT_COLOR_MAP[seat.seatType]((seat.passengerNumber + 1).toString().padStart(2)));
                    } else {
                        row.push(yellow('■'.padStart(2)));
                    }
                }
            } else {
                row.push('——|'.repeat(columns));
            }
            row.push('    ');
        }
        console.log(row.map(r => {
            if (r.endsWith('|')) {
                return r.slice(0, r.length - 1);
            }
            return r;
        }).join('|'));
    }
    console.log(`${EOL}${bold('Legend')}`);
    console.log(LEGEND.join('\t'));
    console.log(EOL);
}

// If run as CLI.
/* istanbul ignore next */
if (!module.parent) {
    const args = process.argv;
    if (args.length !== 4) {
        console.error(`Usage: node index.js <seat_layout> <passengers_count>${EOL}Example: node index.js "[[3,2],[4,3],[2,3],[3,4]]" "30"`);
        process.exit(1);
    }

    try {
        const seatConfig: SeatConfig = JSON.parse(args[2]);
        const passengerCount: number = parseInt(args[3], 10);
        if (typeof passengerCount !== "number" || isNaN(passengerCount)) {
            throw new TypeError();
        }
        const seatMap = buildSeatMapping(seatConfig);
        const assignmentMap = assignSeats(seatMap, passengerCount);
        printSeatAssignments(seatConfig, assignmentMap);
    } catch (err) {
        if (err instanceof SyntaxError) {
            console.error('Error parsing seat layout configuration. Please make sure it is valid JSON!');
        } else if (err instanceof TypeError) {
            console.error('Invalid passenger count. Please make sure it is a valid integer!');
        } else {
            console.error(err);
        }
        process.exit(1);
    }
}
