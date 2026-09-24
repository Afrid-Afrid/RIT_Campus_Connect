import pytest
from selenium.webdriver.common.by import By
from utils.config import BASE_URL, TEST_STUDENT

def test_registration_form_loads(driver):
    driver.get(f"{BASE_URL}/register")
    assert driver.find_element(By.NAME, "email") is not None

def test_duplicate_email_registration(driver):
    driver.get(f"{BASE_URL}/register")
    driver.find_element(By.NAME, "name").send_keys(TEST_STUDENT["name"])
    driver.find_element(By.NAME, "usn").send_keys("1MS25MC100")
    driver.find_element(By.NAME, "email").send_keys(TEST_STUDENT["email"])  # already exists
    driver.find_element(By.NAME, "password").send_keys(TEST_STUDENT["password"])
    driver.find_element(By.NAME, "department").send_keys(TEST_STUDENT["department"])
    driver.find_element(By.NAME, "semester").send_keys(TEST_STUDENT["semester"])
    driver.find_element(By.XPATH, "//button[text()=\x27Register\x27]").click()

    error = driver.find_element(By.CLASS_NAME, "error")
    assert "already registered" in error.text.lower()
