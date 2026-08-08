@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements. See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET __MVNW_CMD__=
@SET __MVNW_ERROR__=
@SET __MVNW_MAVEN_CONFIG_LEGACY_SKIP__=%MAVEN_CONFIG%
@SET "MAVEN_CONFIG="
@SET __MVNW_REPOURL__=%MVNW_REPOURL%

@IF "%MVNW_VERBOSE%"=="true" (
  @ECHO Picked up JAVA_TOOL_OPTIONS: %JAVA_TOOL_OPTIONS%
)

@SET __MVNW_WRAPPER_JAR__=%~dp0.mvn\wrapper\maven-wrapper.jar
@SET __MVNW_WRAPPER_PROPS__=%~dp0.mvn\wrapper\maven-wrapper.properties

@IF NOT EXIST "%__MVNW_WRAPPER_JAR__%"  (
  @CALL :downloadMavenWrapper
  IF ERRORLEVEL 1 (
    SET __MVNW_ERROR__=Failed to download Maven Wrapper
    GOTO :mvn_exec_err
  )
)

:exec_maven
@SET MAVEN_OPTS=%MAVEN_OPTS%
@IF "%MVNW_VERBOSE%"=="true" (
  @ECHO MAVEN_OPTS: %MAVEN_OPTS%
)

@CALL :find_java_from_javahome
IF "%__MVNW_CMD__%"=="" (
  @CALL :find_java_from_path
)
IF "%__MVNW_CMD__%"=="" (
  SET __MVNW_ERROR__=Could not find a suitable version of Java. Please check your JAVA_HOME environment variable.
  GOTO :mvn_exec_err
)

FOR /F "usebackq tokens=1,2 delims==" %%A IN ("%__MVNW_WRAPPER_PROPS__%") DO (
  IF "%%A"=="distributionUrl" SET __MVNW_DISTRIBUTION_URL__=%%B
  IF "%%A"=="distributionSha256Sum" SET __MVNW_DISTRIBUTION_SHA256SUM__=%%B
)

@SET __MVNW_LAUNCHER__=%__MVNW_CMD__% -classpath "%__MVNW_WRAPPER_JAR__%" org.apache.maven.wrapper.MavenWrapperMain

@SET __MVNW_FULL_ARGS__=%*
IF NOT "!__MVNW_MAVEN_CONFIG_LEGACY_SKIP__!"=="" (
  SET __MVNW_FULL_ARGS__=%__MVNW_FULL_ARGS__% "--no-transfer-progress"
)

@CALL "%__MVNW_LAUNCHER__%" %__MVNW_FULL_ARGS__%
IF ERRORLEVEL 1 GOTO :mvn_exec_err
GOTO :mvn_exec_end

:mvn_exec_err
ECHO %__MVNW_ERROR__%>&2
EXIT /B 1

:mvn_exec_end
EXIT /B 0

:find_java_from_javahome
SET JAVA_HOME_BIN_JAVA_BIN=%JAVA_HOME%\bin\java.exe
IF EXIST "%JAVA_HOME_BIN_JAVA_BIN%" (
  SET __MVNW_CMD__="%JAVA_HOME_BIN_JAVA_BIN%"
)
EXIT /B 0

:find_java_from_path
FOR %%i IN (java.exe) DO (
  SET __MVNW_CMD__="%%~$PATH:i"
)
EXIT /B 0

:downloadMavenWrapper
SET __MVNW_DOWNLOAD_FROM__=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

ECHO Downloading Maven Wrapper from %__MVNW_DOWNLOAD_FROM__%
IF NOT EXIST "%~dp0.mvn\wrapper" mkdir "%~dp0.mvn\wrapper"

powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('%__MVNW_DOWNLOAD_FROM__%', '%__MVNW_WRAPPER_JAR__%')}"
IF ERRORLEVEL 1 EXIT /B 1
EXIT /B 0
