import pytest
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage
from utils.config import TEST_STUDENT

def test_valid_login(driver):
    login_page = LoginPage(driver)
    login_page.open()
    login_page.login(TEST_STUDENT["email"], TEST_STUDENT["password"])

    dashboard = DashboardPage(driver)
    assert "Welcome" in dashboard.get_welcome_text()

def test_invalid_password(driver):
    login_page = LoginPage(driver)
    login_page.open()
    login_page.login(TEST_STUDENT["email"], "WrongPassword123")

    assert "Invalid" in login_page.get_error_text()

def test_empty_fields(driver):
    login_page = LoginPage(driver)
    login_page.open()
    login_page.login("", "")

    assert login_page.driver.current_url.endswith("/login")
