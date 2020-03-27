import test from 'tape';
import { stdout } from 'test-console';
import { filterSeats, buildSeatMapping, assignSeats, printSeatAssignments } from './index';
import type { SeatConfig } from './index';

test('👩🏽‍🔬 buildSeatMapping() — should build a seat map for a given layout config.', async t => {
    t.plan(2);
    // Use fixture straight from the problem statement.
    t.deepEquals(buildSeatMapping([[3, 2], [4, 3], [2, 3], [3, 4]]), {
        '0_0_0': 'W',
        '0_1_0': 'M',
        '0_2_0': 'A',
        '1_0_0': 'A',
        '1_1_0': 'M',
        '1_2_0': 'M',
        '1_3_0': 'A',
        '2_0_0': 'A',
        '2_1_0': 'A',
        '3_0_0': 'A',
        '3_1_0': 'M',
        '3_2_0': 'W',
        '0_0_1': 'W',
        '0_1_1': 'M',
        '0_2_1': 'A',
        '1_0_1': 'A',
        '1_1_1': 'M',
        '1_2_1': 'M',
        '1_3_1': 'A',
        '2_0_1': 'A',
        '2_1_1': 'A',
        '3_0_1': 'A',
        '3_1_1': 'M',
        '3_2_1': 'W',
        '1_0_2': 'A',
        '1_1_2': 'M',
        '1_2_2': 'M',
        '1_3_2': 'A',
        '2_0_2': 'A',
        '2_1_2': 'A',
        '3_0_2': 'A',
        '3_1_2': 'M',
        '3_2_2': 'W',
        '3_0_3': 'A',
        '3_1_3': 'M',
        '3_2_3': 'W'
    }, 'should build the seat mapping correctly for the layout config from the original problem statement.');
    t.deepEquals(buildSeatMapping([[1, 2], [3, 2]]), {
        '0_0_0': 'W',
        '1_0_0': 'A',
        '1_1_0': 'M',
        '1_2_0': 'W',
        '0_0_1': 'W',
        '1_0_1': 'A',
        '1_1_1': 'M',
        '1_2_1': 'W'
    }, 'should build the seat mapping correctly for another layout config.');
    t.end();
});

test('👩🏽‍🔬 filterSeats() — should return seats of given type.', async t => {
    t.plan(2);
    t.deepEquals(filterSeats({}, 'A'), [], 'should not error out for an empty seat map.');
    t.deepEquals(filterSeats({
        '0_0_0': 'W',
        '0_1_0': 'M',
        '0_2_0': 'A',
    }, 'W'), [['0_0_0', 'W']], 'should correctly return the filtered seats.');
    t.end();
});

test('👩🏽‍🔬 assignSeats() — should return a seat assignment map for the given seat map and passenger count.', async t => {
    t.plan(2);
    t.deepEquals(assignSeats({
        '0_0_0': 'W',
        '0_1_0': 'M',
        '0_2_0': 'A',
        '1_0_0': 'A',
        '1_1_0': 'M',
        '1_2_0': 'M',
        '1_3_0': 'A',
        '2_0_0': 'A',
        '2_1_0': 'A',
        '3_0_0': 'A',
        '3_1_0': 'M',
        '3_2_0': 'W',
        '0_0_1': 'W',
        '0_1_1': 'M',
        '0_2_1': 'A',
        '1_0_1': 'A',
        '1_1_1': 'M',
        '1_2_1': 'M',
        '1_3_1': 'A',
        '2_0_1': 'A',
        '2_1_1': 'A',
        '3_0_1': 'A',
        '3_1_1': 'M',
        '3_2_1': 'W',
        '1_0_2': 'A',
        '1_1_2': 'M',
        '1_2_2': 'M',
        '1_3_2': 'A',
        '2_0_2': 'A',
        '2_1_2': 'A',
        '3_0_2': 'A',
        '3_1_2': 'M',
        '3_2_2': 'W',
        '3_0_3': 'A',
        '3_1_3': 'M',
        '3_2_3': 'W'
    }, 30), {
        '0_2_0': {
            seatType: 'A',
            passengerNumber: 0
        },
        '1_0_0': {
            seatType: 'A',
            passengerNumber: 1
        },
        '1_3_0': {
            seatType: 'A',
            passengerNumber: 2
        },
        '2_0_0': {
            seatType: 'A',
            passengerNumber: 3
        },
        '2_1_0': {
            seatType: 'A',
            passengerNumber: 4
        },
        '3_0_0': {
            seatType: 'A',
            passengerNumber: 5
        },
        '0_2_1': {
            seatType: 'A',
            passengerNumber: 6
        },
        '1_0_1': {
            seatType: 'A',
            passengerNumber: 7
        },
        '1_3_1': {
            seatType: 'A',
            passengerNumber: 8
        },
        '2_0_1': {
            seatType: 'A',
            passengerNumber: 9
        },
        '2_1_1': {
            seatType: 'A',
            passengerNumber: 10
        },
        '3_0_1': {
            seatType: 'A',
            passengerNumber: 11
        },
        '1_0_2': {
            seatType: 'A',
            passengerNumber: 12
        },
        '1_3_2': {
            seatType: 'A',
            passengerNumber: 13
        },
        '2_0_2': {
            seatType: 'A',
            passengerNumber: 14
        },
        '2_1_2': {
            seatType: 'A',
            passengerNumber: 15
        },
        '3_0_2': {
            seatType: 'A',
            passengerNumber: 16
        },
        '3_0_3': {
            seatType: 'A',
            passengerNumber: 17
        },
        '0_0_0': {
            seatType: 'W',
            passengerNumber: 18
        },
        '3_2_0': {
            seatType: 'W',
            passengerNumber: 19
        },
        '0_0_1': {
            seatType: 'W',
            passengerNumber: 20
        },
        '3_2_1': {
            seatType: 'W',
            passengerNumber: 21
        },
        '3_2_2': {
            seatType: 'W',
            passengerNumber: 22
        },
        '3_2_3': {
            seatType: 'W',
            passengerNumber: 23
        },
        '0_1_0': {
            seatType: 'M',
            passengerNumber: 24
        },
        '1_1_0': {
            seatType: 'M',
            passengerNumber: 25
        },
        '1_2_0': {
            seatType: 'M',
            passengerNumber: 26
        },
        '3_1_0': {
            seatType: 'M',
            passengerNumber: 27
        },
        '0_1_1': {
            seatType: 'M',
            passengerNumber: 28
        },
        '1_1_1': {
            seatType: 'M',
            passengerNumber: 29
        }
    }, 'should correctly assign passengers for the seat mapping from the original problem statement.');
    t.deepEquals(assignSeats({
        '0_0_0': 'W',
        '1_0_0': 'A',
        '1_1_0': 'M',
        '1_2_0': 'W',
        '0_0_1': 'W',
        '1_0_1': 'A',
        '1_1_1': 'M',
        '1_2_1': 'W'
    }, 5, ['M', 'A', 'W']), {
        '1_1_0': {
            seatType: 'M',
            passengerNumber: 0
        },
        '1_1_1': {
            seatType: 'M',
            passengerNumber: 1
        },
        '1_0_0': {
            seatType: 'A',
            passengerNumber: 2
        },
        '1_0_1': {
            seatType: 'A',
            passengerNumber: 3
        },
        '0_0_0': {
            seatType: 'W',
            passengerNumber: 4
        }
    }, 'should correctly assign passengers for another seat mapping with a custom priority.');
    t.end();
});

test('👩🏽‍🔬 printSeatAssignments() — should print the seat assignment nicely.', async t => {
    const seatConfig: SeatConfig = [[3, 2], [4, 3], [2, 3], [3, 4]];
    const seatMap = buildSeatMapping(seatConfig);
    const assignmentMap = assignSeats(seatMap, 30);
    const output: readonly string[] = stdout.inspectSync(() => {
        printSeatAssignments(seatConfig, assignmentMap);
    });
    // These tests assume the output has colors turned off (see `NO_COLOR` environment variable).
    t.equals(output[1], '19|25| 1|    | 2|26|27| 3|    | 4| 5|    | 6|28|20|    \n', 'should be correct.');
    t.equals(output[2], '21|29| 7|    | 8|30| ■| 9|    |10|11|    |12| ■|22|    \n', 'should be correct.');
    t.equals(output[3], '——|——|——|    |13| ■| ■|14|    |15|16|    |17| ■|23|    \n', 'should be correct.');
    t.equals(output[4], '——|——|——|    |——|——|——|——|    |——|——|    |18| ■|24|    \n', 'should be correct.');
    t.end();
});
