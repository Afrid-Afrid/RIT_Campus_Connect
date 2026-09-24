from selenium.webdriver.common.by import By
from utils.waits import wait_visible

class DashboardPage:
    WELCOME_HEADER = (By.TAG_NAME, "h2")
    COURSES_LINK = (By.LINK_TEXT, "Courses")
    ATTENDANCE_LINK = (By.LINK_TEXT, "Attendance")
    EVENTS_LINK = (By.LINK_TEXT, "Events")
    LOGOUT_BUTTON = (By.XPATH, "//button[text()=\x27Logout\x27]")
    STUDENT_TABLE = (By.ID, "student-table")

    def __init__(self, driver):
        self.driver = driver

    def get_welcome_text(self):
        return wait_visible(self.driver, self.WELCOME_HEADER).text

    def go_to_courses(self):
        self.driver.find_element(*self.COURSES_LINK).click()

    def logout(self):
        self.driver.find_element(*self.LOGOUT_BUTTON).click()
