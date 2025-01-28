const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        const order = [
            'createClient.test.ts',
            'updateClient.test.ts',
            'getClient.test.ts',
            'listClients.test.ts',
            'deleteClient.test.ts',
        ];

        return tests.sort((a, b) => {
            return order.indexOf(a.path.split('/').pop()) - order.indexOf(b.path.split('/').pop());
        });
    }
}

module.exports = CustomSequencer;
