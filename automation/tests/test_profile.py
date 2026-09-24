from pages.login_page import LoginPage
from pages.profile_page import ProfilePage
from utils.config import BASE_URL, TEST_STUDENT

def test_update_profile_phone(driver):
    LoginPage(driver).open()
    LoginPage(driver).login(TEST_STUDENT["email"], TEST_STUDENT["password"])
    driver.get(f"{BASE_URL}/profile")

    profile_page = ProfilePage(driver)
    profile_page.update_phone("9876543210")
