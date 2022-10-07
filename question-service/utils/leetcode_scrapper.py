import requests
import time
import json
import sys

from pymongo import MongoClient

def getDatabase():
    CONNECTION_STRING = sys.argv[1]
    client = MongoClient(CONNECTION_STRING, serverSelectionTimeoutMS=5000)

    try:
        client.server_info()
        print("Connection to Database Successful", flush=True)
        return client['cs3219_project']
    except Exception as e:
        print("Unable to connect to database.", flush=True)

def getQuestionContent(titleSlug):
    print(f"Fetching problem title {titleSlug}", flush=True)
    
    endpoint = "https://leetcode.com/graphql"

    query = """query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionId
            title
            content
            difficulty
            topicTags {
                name
            }
            hints
        }
    }"""
    variables = {"titleSlug":titleSlug}
    response = requests.post(endpoint, json={"query": query, "variables":variables})
    return response.json()
    
def main():
    ALGORITHMS_ENDPOINT_URL = "https://leetcode.com/api/problems/algorithms/"

    algorithms_problems_json = requests.get(ALGORITHMS_ENDPOINT_URL).content
    algorithms_problems_json = json.loads(algorithms_problems_json)

    # List to store question_title_slug
    links = []
    for child in algorithms_problems_json["stat_status_pairs"]:
        # Only process free problems
        if not child["paid_only"]:
            question__title_slug = child["stat"]["question__title_slug"]
            question_id = child["stat"]["frontend_question_id"]
            difficulty = child["difficulty"]["level"]
            links.append((question_id, question__title_slug, difficulty))
            
    # Sort by difficulty follwed by problem id in ascending order
    links = sorted(links, key=lambda x: (x[0]))

    data = []
    try:
        for i in range(len(links)):
            question_id, question_title_slug, difficulty = links[i]
            content = getQuestionContent(question_title_slug)['data']['question']
            data.append({
                'question_id':content['questionId'],
                'question_difficulty':content['difficulty'],
                'question_title':content['title'],
                'question_content':content['content']})
            
    finally:
        print("Finishing fetching leetcode questions", flush=True)
        questionmodel = getDatabase()["questionmodels"]
        for x in range(len(data)):
            questionmodel.replace_one({'question_id':data[x]['question_id']}, data[x], upsert=True)
        print("Finish updating data", flush=True)
        

if __name__ == "__main__":
    main()
