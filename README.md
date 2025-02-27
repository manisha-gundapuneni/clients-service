Create a basic backend service that simulates realtime captioning and tracks usage.


Create two API endpoints for clients of the service:

1. **Captioning Endpoint**
A web socket accepting realtime audio packets and periodically returning captions.
2. **Usage Endpoint**
A RESTful resource returning the current captioning usage total for a given client.
3. **Tech Stack Preference**
Use Node.js and Express.



- Assume that realtime audio data is sent by clients over the web socket in sequential packets, with each new packet representing 100ms of speech content.
- The service should just *simulate* caption content, and doesn’t need to actually perform any transcription. Using ‘lorem ipsum’ text or something else for output, about when and how often captions might be returned to the client.
- You may use any storage mechanism you think appropriate to track usage. This could involve a database, but an in-memory store is sufficient.
- Session token of any sort in order to identify clients.

Implement a captioning time limit, which terminates captioning when a user has exceeded a certain pre-set allowance.
