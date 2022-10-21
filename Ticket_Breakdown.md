# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**
****

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions
- We have provided the Client Facilities with an Admin panel to manage their shifts / agents
- The Admin panel is a SPA that communicates with the backend through REST APIs
- We use a SQL database
****
### Tickets

### #1 - Run DB migrations to add field `custom_id` to agents table

#### Migration Details
Field Type - Char
Max Length - 128
Default    - Null
Nullable   - true

#### Acceptance Criteria
1. `agents` table should have a char field with the values described above in both the production and staging databases.
2. The migration should not lead to any signifiant downtime

#### Estimated Hours - 2

#### Blocked By - None

****
### #2 - Modify agent CRUD APIs to handle new `custom_id` key

#### API changes -
`\api\agents\{id}` [POST]
**Changes in request payload**
- New Key -  `custom_id` 
- Optional - Yes
- Validations - Should be a string of max_length 128

**Changes in response** - None


`\api\agents\{id}` [PUT]
**Changes in request payload**
- New Key -  `custom_id` 
- Optional - Yes
- Validations - Should be a string of max_length 128

**Changes in response**
- Add `custom_id` in response


`\api\agents\{id}` [GET]
**Changes in request payload** - None

**Changes in response**
- Add `custom_id` in response

#### Acceptance Criteria
1. Create and Update APIs for agent should accept the new `custom_id` key and save its value in the DB
2. Get agent API should return the new `custom_id` key
3. APIs should validate the custom_id (Max Length - 128) 
4. Code changes should have unit test coverage

#### Estimated Hours - 6

#### Blocked By - Ticket #1

****

### #3 - Admin Panel should allow client to add, view and update custom ids for new

#### Updated Designs
The updated designs for the create, edit and view agent pages will be added here.

#### Implementation Details
- We can start working on the UI changes while the API changes are being done. The new key would be named `custom_id` as documented in Ticket #2.
- API integration related changes can be done later once #2 is completed.


#### Acceptance Criteria
1. Create Agent page should have an optional input to provide custom_id. Max length for the input should be 128.
2. Update Agent page should have an optional input to provide custom_id. Max length for the input should be 128.
3. Agent Details page should show the custom id added for the agent.
4. Automated UI tests should be updated to test this new field as well. 

#### Estimated Hours - 6

#### Blocked By - Ticket #2

****

### #4 - Generated PDF reports should show the custom_id for agents when available

If a Client has provided custom IDs for an agent, than in the PDF reports we need to show this custom ID instead of the DB generated ID to identify the agent.

#### Implementation Details
- We will modify `getShiftsByFacility` to return the `custom_id` in the agent metadata. If a custom id is not present this key will be null.
- `generateReport` method should be modified to use the `custom_id` when its not null while adding the agent details in the PDF.


#### Acceptance Criteria
1. For agents that don't have a custom ID the Final report should show the DB generated ID
2. For agents that do have a custom ID the Final report should show the custom ID
3. Code changes should be covered by unit tests.

#### Estimated Hours - 2

#### Blocked By - Ticket #1

****

### Execution Plan
- Ticket #1 needs to be finished on priority as it blocks all other tickets directly or indirectly.
- After Ticket #1 is done, work on Ticket #2 and #4 can start in parallel. 
- UI changes for #3 can be started immidiately.

