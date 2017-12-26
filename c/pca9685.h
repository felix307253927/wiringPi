
#ifdef __cplusplus
extern "C" {
#endif

// Setup a pca9685 at the specific i2c address
extern int pca9685Setup(const int pinBase, const int i2cAddress/* = 0x40*/, float freq/* = 50*/);

// Advanced controls
// You can use the file descriptor returned from the setup function to access the following features directly on each connected pca9685
extern void pca9685PWMFreq(int fd, float freq);
extern void pca9685PWMReset(int fd);
extern void pca9685PWMWrite(int fd, int pin, int on, int off);
extern void pca9685PWMRead(int fd, int pin, int *on, int *off);

extern void pca9685FullOn(int fd, int pin, int tf);
extern void pca9685FullOff(int fd, int pin, int tf);

#ifdef __cplusplus
}
#endif
