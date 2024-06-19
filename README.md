# Type Speed

## A TypeRacer website

## Statistict

### WPM 
Total number of characters in the correctly typed words (including spaces), divided by 5 and normalized to 60 seconds.

### Raw WPM 
Calculated just like WPM, but also includes incorrect words.

### Accuracy (Acc)
Percentage of correctly pressed keys.

### Char Ratio
Ratio of correct characters to incorrect characters. Calculated after the test has ended.

### Consistency
Based on the variance of your raw WPM. Closer to 100% is better. Calculated using the coefficient of variation of raw WPM and mapped onto a scale from 0 to 100.

## Experience

### XP
Experience points earned for completing a race. The amount of XP earned is based on the time you spend in the race.

time * 2 * modifier * accuracyModifier

#### Modifier
+0.5 for 100% accuracy

+0.25 for achieving no errors or typos

#### Accuracy Modifier
(accuracy - 50) / 50

### Level
XP needed to progress is being calculated by multiplying next level by 50.
