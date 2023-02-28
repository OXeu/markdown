plugins {
//    kotlin("android").version("1.8.0").apply(false)
    kotlin("multiplatform").version("1.8.0").apply(true)
    id("maven-publish")
}
group = "life.xeu"
version = "1.0.4"

kotlin {
    jvm {
        jvmToolchain(8)
        withJava()
        testRuns["test"].executionTask.configure {
            useJUnitPlatform()
        }
    }
    js(BOTH) {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
        }
    }
    iosArm64()
    iosX64()
    iosSimulatorArm64()
//    android()
    val hostOs = System.getProperty("os.name")
    val isMingwX64 = hostOs.startsWith("Windows")
    val nativeTarget = when {
        hostOs == "Mac OS X" -> macosX64("native")
        hostOs == "Linux" -> linuxX64("native")
        isMingwX64 -> mingwX64("native")
        else -> throw GradleException("Host OS is not supported in Kotlin/Native.")
    }

    
    sourceSets {

        val commonMain by getting {
            dependencies {}
        }
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }

//        val androidMain by getting {
//            dependencies {
//                implementation("io.ktor:ktor-client-okhttp:$ktorVersion")
//            }
//        }
        val iosArm64Main by getting
        val iosX64Main by getting
        val iosSimulatorArm64Main by getting
        val iosMain by creating {
            dependsOn(commonMain)
            iosX64Main.dependsOn(this)
            iosArm64Main.dependsOn(this)
            iosSimulatorArm64Main.dependsOn(this)
            dependencies {
            }
        }
        val jvmMain by getting
        val jvmTest by getting
        val jsMain by getting
        val jsTest by getting
        val nativeMain by getting
        val nativeTest by getting
    }
}

repositories {
    mavenCentral()
    maven {
        setUrl("https://s01.oss.sonatype.org/content/repositories/releases/")
    }
}