import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Expenses')

def lambda_handler(event, context):

    print(event)

    method = event['requestContext']['http']['method']

    if method == 'POST':
        data = json.loads(event['body'])
        expense_id = str(uuid.uuid4())

        table.put_item(Item={
            "expense_id": expense_id,
            "amount": data['amount'],
            "category": data['category'],
            "date": data['date']
        })

        return {
        "statusCode": 201,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
    },
    "body": json.dumps({"message": "Expense added", "id": expense_id})
}

    if method == 'GET':
        expense_id = event['queryStringParameters']['expense_id']
        response = table.get_item(Key={"expense_id": expense_id})

        return {
            "statusCode": 200,
            "body": json.dumps(response.get("Item", {}))
        }

    if method == 'PUT':
        data = json.loads(event['body'])
        expense_id = data['expense_id']

        table.update_item(
            Key={"expense_id": expense_id},
            UpdateExpression="SET amount=:a, category=:c, date=:d",
            ExpressionAttributeValues={
                ":a": data['amount'],
                ":c": data['category'],
                ":d": data['date']
            }
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Expense updated"})
        }

    if method == 'DELETE':
        expense_id = event['queryStringParameters']['expense_id']

        table.delete_item(Key={"expense_id": expense_id})

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Expense deleted"})
        }