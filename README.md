# Distributed MongoDB Change Streams Example

This project demonstrates how to distribute MongoDB change streams across multiple processes for parallel mutually-exclusive event processing.

## Prerequisites

- Node.js v16.x.x+
- A running MongoDB instance.
- `npm install` to install dependencies

## Usage

You can run multiple instances of the script, each responsible for a portion of the change stream events.

### Environment Variables

- `NUM_STREAMS`: Total number of parallel streams.
- `STREAM_ID`: The unique ID for this stream (`1..n`).

### Example

Start three parallel streams that handle mutually-exclusive events (use the `MONGO_URI` environment variable if not running on `mongodb://localhost:27017`):

```sh
NUM_STREAMS=3 STREAM_ID=1 node src/index.js
NUM_STREAMS=3 STREAM_ID=2 node src/index.js
NUM_STREAMS=3 STREAM_ID=3 node src/index.js
```
