import mongoose from 'mongoose';
import debug from 'debug';

const debuglog = debug('app')

async function connect() {
    const dburi = process.env.DBURL || ''

    try {
        await mongoose.connect(dburi)
        console.log('Connected')
    } catch (error) {
        console.log('Could not connect to DB: ' + process.env.BDURL)
        console.log(error)

        process.exit(1)
    }
}

export default connect