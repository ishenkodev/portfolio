#!/bin/bash
# Simple test script to verify email form integration
# Run this locally before uploading to your hosting

echo "=== Email Form Integration Test ==="
echo ""

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "⚠️  curl not found. Please install curl to run tests."
    exit 1
fi

# Check if PHP is available
if ! command -v php &> /dev/null; then
    echo "⚠️  PHP not found. Please install PHP to run local tests."
    exit 1
fi

echo "✓ curl and PHP found"
echo ""

# Test 1: Check if send_message.php exists
echo "Test 1: Checking files..."
if [ -f "api/send_message.php" ]; then
    echo "  ✓ api/send_message.php exists"
else
    echo "  ✗ api/send_message.php NOT found"
    exit 1
fi

if [ -f "script.js" ]; then
    echo "  ✓ script.js exists"
else
    echo "  ✗ script.js NOT found"
    exit 1
fi

echo ""

# Test 2: Check PHP syntax
echo "Test 2: Checking PHP syntax..."
php -l api/send_message.php > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  ✓ api/send_message.php has valid syntax"
else
    echo "  ✗ Syntax error in api/send_message.php"
    php -l api/send_message.php
    exit 1
fi

echo ""

# Test 3: Check if script.js contains the correct fetch endpoint
echo "Test 3: Checking JavaScript integration..."
if grep -q "api/send_message.php" script.js; then
    echo "  ✓ script.js references api/send_message.php"
else
    echo "  ✗ script.js does not reference api/send_message.php"
    exit 1
fi

if grep -q "fetch.*api" script.js; then
    echo "  ✓ script.js uses fetch() for API calls"
else
    echo "  ✗ script.js does not use fetch()"
    exit 1
fi

echo ""

# Test 4: Simulate a form submission (POST request)
echo "Test 4: Testing form submission (simulated)..."
echo "  ℹ Starting local PHP server on port 8888..."

# Start PHP built-in server in background
php -S localhost:8888 > /tmp/php_server.log 2>&1 &
PHP_PID=$!
sleep 2

# Test form submission
TEST_NAME="Test User"
TEST_EMAIL="test@example.com"
TEST_MESSAGE="This is a test message from the form validation script."

echo "  ℹ Sending test form data..."

RESPONSE=$(curl -s -X POST http://localhost:8888/api/send_message.php \
    -d "name=$TEST_NAME" \
    -d "email=$TEST_EMAIL" \
    -d "message=$TEST_MESSAGE" \
    -w "\n")

# Kill the PHP server
kill $PHP_PID 2>/dev/null
wait $PHP_PID 2>/dev/null

# Check response
if echo "$RESPONSE" | grep -q '"success"'; then
    echo "  ✓ Form submission received valid response"
    echo "    Response: $(echo $RESPONSE | head -c 100)..."
else
    echo "  ✗ Invalid response from API"
    echo "    Response: $RESPONSE"
    exit 1
fi

echo ""

# Test 5: Validate email recipients
echo "Test 5: Checking email configuration..."
if grep -q "isholegg@gmail.com" api/send_message.php; then
    echo "  ✓ Recipient email set to isholegg@gmail.com"
else
    echo "  ⚠️  Recipient email may not be correctly configured"
fi

echo ""
echo "=== All Tests Passed! ✓ ==="
echo ""
echo "📝 Next steps:"
echo "  1. Upload the landingDeveloper/ folder to your hosting"
echo "  2. Test the contact form on your live site"
echo "  3. Verify emails arrive at isholegg@gmail.com"
echo ""
