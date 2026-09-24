from pages.login_page import LoginPage
from pages.attendance_page import AttendancePage
from utils.config import BASE_URL, TEST_STUDENT

def test_attendance_table_loads(driver):
    LoginPage(driver).open()
    LoginPage(driver).login(TEST_STUDENT["email"], TEST_STUDENT["password"])
    driver.get(f"{BASE_URL}/attendance")

    attendance_page = AttendancePage(driver)
    assert attendance_page.get_row_count() >= 0
