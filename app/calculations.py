def calculate_tension(unit_weight, scale_length, frequency):
    return(
        unit_weight * (2 * scale_length * frequency) ** 2
    ) / 386.4